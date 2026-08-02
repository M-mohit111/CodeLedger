// here in this file we will create featues for user

const express = require('express')
const authrouter = express.Router();

// register
authrouter.post("/register",register);
// login
authrouter.post("/login",login);
// logout
authrouter.post("/logout",logout);
// getprofile
authrouter.post("/getprofile",getprofile);
