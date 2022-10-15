const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    addIssueToSprint , addFeedbackSprint,changeIssueStatusTodoToInProgress,changeIssueStatusInProgressToDone,closeSprintById, getSprintIssues
} = require("../controllers/Sprint.controller");

closeSprintById
router.put("/createissue/:id",addIssueToSprint);
router.put("/:id/inprogress",changeIssueStatusTodoToInProgress);
router.put("/:id/done",changeIssueStatusInProgressToDone);
router.put("/addFeedback/:id",addFeedbackSprint);
router.put("/close/:id",closeSprintById);
router.get("/issues/:id", getSprintIssues);

module.exports = router;
