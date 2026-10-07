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
    // validate the data;
    validate(req.body); 
    const {firstName, emailId, password}  = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = 'user';
    
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
        success: true,
        user:reply,
        message:"Registered Successfully"
    })
}


const login = async (req, res) => {
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
};


const logout = async(req,res)=>{
    const {token} = req.cookies;
    if (token) {
        const payload = jwt.decode(token);
        if (payload && payload.exp) {
            await redisClient.set(`token:${token}`,'Blocked');
            await redisClient.expireAt(`token:${token}`,payload.exp);
        }
    }

    res.cookie("token",null,{ ...authCookieOptions, expires: new Date(0) });
    res.status(200).json({ success: true, message: "Logged Out Succesfully" });
}


const adminRegister = async(req,res)=>{
    validate(req.body); 
    const {firstName, emailId, password}  = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = 'admin'; // Ensure role is explicitly set to admin
    
    const user =  await User.create(req.body);
    const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
    
    res.cookie('token',token, authCookieOptions);
    
    res.status(201).json({ success: true, message: "Admin Registered Successfully" });
}

const deleteProfile = async(req,res)=>{
    const userId = req.result._id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "Deleted Successfully" });
}


module.exports = { 
    register: asyncHandler(register), 
    login: asyncHandler(login), 
    logout: asyncHandler(logout), 
    adminRegister: asyncHandler(adminRegister), 
    deleteProfile: asyncHandler(deleteProfile) 
};