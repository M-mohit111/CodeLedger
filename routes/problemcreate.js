const express = require('express')

const problemauth = express.Router();

problemauth.post("/create",problemcreate)

problemauth.get("/:id",problemfetch)

problemauth.delete("/:id",problemdelete)

problemauth.patch("/:id",problemupdate)

problemauth.get("/create",allproblemfetch)

problemauth.get("/create",solverproblem)

module.exports = problemauth