const express = require('express');

const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const {createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedAllProblembyUser, submittedProblem} = require("../controllers/userproblem");
const userMiddleware = require("../middleware/userMiddleware");

// Admin problem management
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.patch("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

// User problem inspection
problemRouter.get("/problemById/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);
problemRouter.get("/problemSolvedByUser", userMiddleware, solvedAllProblembyUser);
problemRouter.get("/submittedProblem/:pid", userMiddleware, submittedProblem);

// Lowercase route path aliases for backwards compatibility
problemRouter.get("/getproblembyid/:id", userMiddleware, getProblemById);
problemRouter.get("/getallproblem", userMiddleware, getAllProblem);
problemRouter.get("/problemsolvedbyuser", userMiddleware, solvedAllProblembyUser);

module.exports = problemRouter;