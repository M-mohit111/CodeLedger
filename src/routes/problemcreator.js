const express = require('express')
const adminmiddleware = require('../middleware/adminMiddleware')
const { createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, solvedallproblembyuser } = require('../controllers/userproblem')
const problemRouter = express.Router();

// in this the admin will going to create a new question of platform
problemRouter.post('/create', adminmiddleware, createproblem)
problemRouter.patch('/:id', updateproblem)
problemRouter.delete('/:id', deleteproblem)

// this is for user to see the problem
problemRouter.get('/:id', getproblembyid)
problemRouter.get('/', getallproblem)
problemRouter.get('/user', solvedallproblembyuser)

module.exports = problemRouter
