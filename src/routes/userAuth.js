// here in this file we will create featues for user

const express = require('express')
const authrouter = express.Router();
const usermiddleware = require('../middleware/userMiddleware')
const adminmiddleware = require('../middleware/adminMiddleware')
const {register,login,logout,adminRegister} = require('../controllers/userAuthentication')

// register
authrouter.post("/register",register);
// login
authrouter.post("/login",login);
// logout
authrouter.post("/logout",usermiddleware,logout);
// admin register
authrouter.post("/admin/register", adminmiddleware, adminRegister);

// getprofile
// authrouter.post("/getprofile",getprofile);

module.exports = authrouter