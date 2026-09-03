const Problem = require('../models/problem');
const { findById } = require('../models/user');
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
    const {id} = req.params;
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;
    try{
        if(!id){
            res.send("id is missing fill the field");
        }
        const serachid = Problem.findById(id);
        if(!serachid){
            res.send("no matching problem is their saved");
        }

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

        const updatedquestion = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

        res.status(201).send(updatedquestion);
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Delete problem by ID
const deleteproblem = async (req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            res.send("id field is missing");
        }
        const deletethatproblem = await Problem.findByIdAndDelete(id);
        if(!deletethatproblem){
            res.send("their is not such problem")
        }
        res.send("problem delete sucessfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Get problem by ID
const getproblembyid = async (req,res)=>{
    const {id} = req.params
    try{
        if(!id){
            res.send("id field is missing");
        }
        const gettheproblem = await Problem.findById(id);
        if(!gettheproblem){
            res.send("their is not such problem")
        }
        res.send(gettheproblem);
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// Get all problems
const getallproblem = async (req,res)=>{

    try{
        const getalltheproblem = await Problem.find({});
        if(getalltheproblem.length==0){
            res.send("their is not such problem")
        }
        res.send(getalltheproblem);
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