const Problem = require('../models/problem')

const createproblem = async (req, res, next) => {
    const { title, description, difficulty, tags,
        visibleTestCases, hiddenTestCases,
        startCode, problemCreator, referencesolution
    } = req.body;

    try {
        res.status(201).send('problem created');
    }
    catch (err) {
        res.status(400).send('error: ' + err.message);
    }
}

const updateproblem = async (req, res) => {
    res.status(200).send('problem updated');
}

const deleteproblem = async (req, res) => {
    res.status(200).send('problem deleted');
}

const getproblembyid = async (req, res) => {
    res.status(200).send('problem by id');
}

const getallproblem = async (req, res) => {
    res.status(200).send('all problems');
}

const solvedallproblembyuser = async (req, res) => {
    res.status(200).send('solved problems by user');
}

module.exports = { createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, solvedallproblembyuser }
