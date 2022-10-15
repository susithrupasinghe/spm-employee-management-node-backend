const express = require("express");
const {
    getAllIssueToDo,passToInprograss,getAllIssueInprogres} = require("../controllers/Issue.controller");
const router = express.Router();


router.get("/issueTodo/:id", getAllIssueToDo);
router.put("/issuePassTodo", passToInprograss);
router.get("/issueInprogress/:id", getAllIssueInprogres);

module.exports = router;