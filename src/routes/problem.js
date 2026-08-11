const express = require('express')
const adminmiddleware = require('../middleware/adminMiddleware')
const { createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, solvedallproblembyuser } = require('../controllers/problem')
const problemauth = express.Router();

// in this the admin will going to create a new question of platform
problemauth.post('/create', adminmiddleware, createproblem)
problemauth.patch('/:id', updateproblem)
problemauth.delete('/:id', deleteproblem)

problemauth.get('/:id', getproblembyid)
problemauth.get('/', getallproblem)
problemauth.get('/user', solvedallproblembyuser)

module.exports = problemauth