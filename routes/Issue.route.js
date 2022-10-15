const express = require("express");
const {
    gellAllIssueToDo} = require("../controllers/Issue.controller");
const router = express.Router();


router.get("/issueTodo/:id", gellAllIssueToDo);

module.exports = router;