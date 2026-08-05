// here in this file we will create featues for user

const express = require('express')
const authrouter = express.Router();
const usermiddleware = require('../middleware/usermiddleware')
const adminmiddleware = require('../middleware/adminmiddleware')
const {register,login,logout,adminRegister} = require('../controller/userauthentication')

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