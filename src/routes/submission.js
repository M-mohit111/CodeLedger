const express = require('express');
const { submitCode } = require('../controllers/submission');
const submissionRouter = express.Router();

submissionRouter.post('/submit', submitCode);

module.exports = submissionRouter;