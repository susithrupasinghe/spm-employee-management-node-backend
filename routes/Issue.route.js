const express = require("express");
const {
    getAllIssueToDo,passToInprograss,getAllIssueInprogres,updateIssue, getIssue} = require("../controllers/Issue.controller");

const router = express.Router();


router.get("/issueTodo/:id", getAllIssueToDo);
router.put("/issuePassTodo", passToInprograss);
router.get("/issueInprogress/:id", getAllIssueInprogres);

router.get("/:id", getIssue);

router.patch("/:id", updateIssue);

module.exports = router;