const jwt = require('jsonwebtoken');
const User = require('../models/user');
const redisclient = require("../config/redis");

const adminmiddleware = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("invalid token")
        }
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const {_id} = payload;
        if(!_id){
            throw new Error("invalid token")
        }
        const result = await User.findById(_id);
        if(!payload.role){
            throw new Error("invalid token")
        }
        if(!result){
            throw new Error("user doesn't exists")
        }
        const present = await redisclient.exists(`token:${token}`);
        if(present){
            throw new Error("blocked token")
        }
        req.result = result;
        next();
    }
    catch(err){
        return res.status(401).send("error: " + err.message);
    }

}

module.exports = adminmiddleware