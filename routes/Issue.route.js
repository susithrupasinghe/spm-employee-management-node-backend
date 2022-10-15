const express = require("express");
const { gellAllIssueToDo , updateIssue, getIssue} = require("../controllers/Issue.controller");
const router = express.Router();


router.get("/issueTodo/:id", gellAllIssueToDo);

router.get("/:id", getIssue);

router.patch("/:id", updateIssue);

module.exports = router;