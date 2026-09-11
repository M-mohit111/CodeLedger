const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");
const asyncHandler = require('../utils/asyncHandler');
const submitCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body;

        if (!userId || !code || !problemId || !language) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (language === 'cpp') language = 'c++';

        // Fetch the problem from database
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }
        
        // Store submission initially
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'pending',
            testCasesTotal: problem.hiddenTestCases.length
        });

        // Submit code to Judge0
        const languageId = getLanguageById(language);
        const submissions = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value) => value.token);
        const testResult = await submitToken(resultToken);

        // Update submission results
        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'accepted';
        let errorMessage = null;

        for (const test of testResult) {
            if (test.status_id == 3) {
                testCasesPassed++;
                runtime += parseFloat(test.time);
                memory = Math.max(memory, test.memory);
            } else {
                if (test.status_id == 4) {
                    status = 'error';
                    errorMessage = test.stderr;
                } else {
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

        // FIX: Only insert into problemSolved if the overall status is actually 'accepted'
        if (status === 'accepted' && !req.result.problemSolved.includes(problemId)) {
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }

        const accepted = (status === 'accepted');
        
        return res.status(201).json({
            success: true,
            accepted,
            totalTestCases: submittedResult.testCasesTotal,
            passedTestCases: testCasesPassed,
            runtime,
            memory
        });

    } catch (err) {
        console.error("Submit Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const runCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        let { code, language } = req.body;

        if (!userId || !code || !problemId || !language) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Fetch the problem from database
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        if (language === 'cpp') language = 'c++';

        // Submit code to Judge0
        const languageId = getLanguageById(language);
        const submissions = problem.visibleTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value) => value.token);
        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = true;
        let errorMessage = null;

        for (const test of testResult) {
            if (test.status_id == 3) {
                testCasesPassed++;
                runtime += parseFloat(test.time);
                memory = Math.max(memory, test.memory);
            } else {
                status = false;
                errorMessage = test.stderr;
            }
        }

        return res.status(200).json({
            success: status,
            testCases: testResult,
            runtime,
            memory
        });

    } catch (err) {
        console.error("Run Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { submitCode, runCode };