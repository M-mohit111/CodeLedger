const User = require("../src/models/user");
const validate = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = (req,res)=>{

    try{
        
        // first we will check the data in required matches the formate in userschema or not
        const isallow = validate(req.dody);

        if(!isallow){
            throw new error("invalid crediantial")
        }

        const[firstname,emailid,password] = req.body;

        // before storing the data hash the password
        req.body.password = await bcrypt.hash(password,10);

        // this we use when we need to save data directly which any change
        // in this create we not need to check whether this user already present in the db or not
        // it will check itself and send the error of presence is already exists
        const user = await User.create(req.body);

        // // this we use when we need to modify data like converting password into hash
        // const data = new User(req.body);
        // data.save();

        // now everything is done we can create jwt token
        const token = await jwt.sign({emailid},process.env.JWT_SECRETE_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("user sucessfully register")

    }
    catch(err){
        res.status(400).send("error: " + err);
    }

}

const login = (req,res)=>{
    try{
        const {emailid,password} = req.body;
        if(!emailid){
            throw new Error("invalid credentials")
        }
        if(!password){
            throw new Error("invalid credentials")
        }
        const present = await User.findOne({emailid})
        if(!present){
            throw new Error("Invalid credentials");
        }
        const match = await bcrypt.compare(password,present.password);

        if(!match){
            throw new Error("invalid credentials")
        }

        const token = await jwt.sign({emailid},process.env.JWT_SECRETE_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(201).send("user sucessfully login")

    }
    catch(err){
        res.send("error"+err);
    }
}