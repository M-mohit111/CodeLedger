const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis")

const userMiddleware = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).json({ success: false, message: "Token is not present" });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_KEY);
        } catch(e) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        const {_id} = payload;
        if(!_id){
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }

        const result = await User.findById(_id);
        if(!result){
            return res.status(401).json({ success: false, message: "User Doesn't Exist" });
        }

        // Check if token is blocked in Redis
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked) {
            return res.status(401).json({ success: false, message: "Token has been invalidated (Logged out)" });
        }

        req.result = result;
        next();
    } catch(err) {
        next(err); // pass to global error handler
    }
}

module.exports = userMiddleware;
