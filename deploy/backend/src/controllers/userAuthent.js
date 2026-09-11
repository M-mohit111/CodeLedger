const redisClient = require("../config/redis");
const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Submission = require("../models/submission")
const asyncHandler = require('../utils/asyncHandler');

const authCookieOptions = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production'
};

const register = async (req,res)=>{
    
    try{
        // validate the data;

      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
      req.body.role = 'user'
    //
    
     const user =  await User.create(req.body);
     const token =  jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_KEY,{expiresIn: 60*60});
     const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role:user.role,
    }
    
    res.cookie('token',token,authCookieOptions);
     
     res.status(201).json({
        user:reply,
        message:"Loggin Successfully"
    })
    }
catch(err){
    console.log("🚨 SIGNUP MEIN YEH ERROR HAI: ", err.message || err);
    res.status(400).send("Error: "+err);
}
}


const login = asyncHandler(async (req, res) => {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ emailId });
    
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role: user.role,
    };

    const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    
    res.cookie('token', token, authCookieOptions);
    
    return res.status(200).json({
        success: true,
        user: reply,
        message: "Logged in successfully"
    });
});

// logOut feature

const logout = async(req,res)=>{

    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);


        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);
    //    Token add kar dung Redis ke blockList
    //    Cookies ko clear kar dena.....

    res.cookie("token",null,{ ...authCookieOptions, expires: new Date(Date.now()) });
    
    res.send("Logged Out Succesfully");

    }
    catch(err){
       res.status(503).send("Error: "+err);
    }
}


const adminRegister = async(req,res)=>{
    try{
        // validate the data;
    //   if(req.result.role!='admin')
    //     throw new Error("Invalid Credentials");  
      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
    //
    
     const user =  await User.create(req.body);
     const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
     
     res.cookie('token',token,{ maxAge: 60*60*1000, httpOnly: true, sameSite: 'none', secure: true });
     
     res.status(201).send("User Registered Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);

    // Submission se bhi delete karo...
    
    // await Submission.deleteMany({userId});
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
      
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { 
    register: asyncHandler(register), 
    login, 
    logout: asyncHandler(logout), 
    adminRegister: asyncHandler(adminRegister), 
    deleteProfile: asyncHandler(deleteProfile) 
};