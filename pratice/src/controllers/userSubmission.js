const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtility");

const submitCode = async (req,res)=>{
   
    try{
       const userId = req.result._id;
       const problemId = req.params.id;

       const {code,language} = req.body;

      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");

       // Fetch the problem from database
       const problem = await Problem.findById(problemId);
       if(!problem) return res.status(404).send("Problem not found");

       const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
       });

       const languageId = getLanguageById(language);

       const submissions = problem.hiddenTestCases.map((testcase)=>({
           source_code:code,
           language_id: languageId,
           stdin: testcase.input,
           expected_output: testcase.output
       }));

       const submitResult = await submitBatch(submissions);
       
       const resultToken = submitResult.map((value)=> value.token);

       const testResult = await submitToken(resultToken);
       
       let testCasesPassed = 0;
       let runtime = 0;
       let memory = 0;
       let status = 'accepted';
       let errorMessage = null;

       for(const test of testResult){
           if(test.status_id==3){
              testCasesPassed++;
              runtime = runtime+parseFloat(test.time);
              memory = Math.max(memory,test.memory);
           }else{
             if(test.status_id==4){
               status = 'error';
               errorMessage = test.stderr;
             }
             else{
               status = 'wrong';
               errorMessage = test.stderr;
             }
           }
       }

       // Store the result in Database in Submission
       submittedResult.status = status;
       submittedResult.testCasesPassed = testCasesPassed;
       submittedResult.errorMessage = errorMessage;
       submittedResult.runtime = runtime;
       submittedResult.memory = memory;

       await submittedResult.save();
       
       if(!req.result.problemSolved){
         req.result.problemSolved = [];
       }

       if(status === 'accepted' && !req.result.problemSolved.some(id => id.toString() === problemId.toString())){
         req.result.problemSolved.push(problemId);
         await req.result.save();
       }

       res.status(201).send(submittedResult);
    }
    catch(err){
      res.status(500).send("Internal Server Error "+ err);
    }
};

const runCode = async(req,res)=>{
    
    try{
      const userId = req.result._id;
      const problemId = req.params.id;

      const {code,language} = req.body;

      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");

      const problem = await Problem.findById(problemId);
      if(!problem) return res.status(404).send("Problem not found");

      const languageId = getLanguageById(language);

      const submissions = problem.visibleTestCases.map((testcase)=>({
          source_code:code,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));

      const submitResult = await submitBatch(submissions);
      
      const resultToken = submitResult.map((value)=> value.token);

      const testResult = await submitToken(resultToken);

      res.status(201).send(testResult);
    }
    catch(err){
      res.status(500).send("Internal Server Error "+ err);
    }
};

module.exports = {submitCode,runCode};
