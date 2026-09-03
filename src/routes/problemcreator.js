const express = require('express')
const adminmiddleware = require('../middleware/adminMiddleware')
const { createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, solvedallproblembyuser } = require('../controllers/userproblem');
const usermiddleware = require('../middleware/userMiddleware');
const problemRouter = express.Router();

// in this the admin will going to create a new question of platform
problemRouter.post('/create', adminmiddleware, createproblem)
problemRouter.patch('/update/:id',adminmiddleware, updateproblem)
problemRouter.delete('/delete/:id',adminmiddleware, deleteproblem)

// this is for user to see the problem
problemRouter.get('/getproblembyid/:id',usermiddleware, getproblembyid)
problemRouter.get('/getallproblem',usermiddleware, getallproblem)
problemRouter.get('/problemsolvedbyuser',usermiddleware, solvedallproblembyuser)

module.exports = problemRouter