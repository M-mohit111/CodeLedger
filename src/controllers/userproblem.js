const Problem = require('../models/problem')
const {getLanguageById,submitBatch,submitToken} = require('../utils/problemUtility')

// here the admin can create the problem and save it in db
// to check that the post person is admin or not is check in previous route file with adminmiddleware file
// and with the help of that file next() we will get the admin id detail which we can use to save problem in db with the id
const createproblem = async (req,res)=>{
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
    try{
        for(const {language,completeCode} of referenceSolution){

            const languageId = getLanguageById(language);

            const submissions = visibleTestCases.map((testcase)=>({
                source_code:completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            const submitResult = await submitBatch(submissions);

            const resultToken = submitResult.map((value)=> value.token);

            const testResult = await submitToken(resultToken);

            for(const test of testResult){
                if(test.status_id!=3){
                return res.status(400).send("Error Occured");
                }
            }
        }

        const userProblem =  await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        });

        res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Update problem by ID
const updateproblem = async (req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Delete problem by ID
const deleteproblem = async (req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Get problem by ID
const getproblembyid = async (req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Get all problems
const getallproblem = async (req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Get all problems solved by user
const solvedallproblembyuser = async (req,res)=>{
    try{

    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

module.exports = {createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, solvedallproblembyuser};