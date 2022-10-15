const express = require("express");
const EmployeeModel = require("../models/Employee.model");
const IssueModel = require("../models/Issue.model");
const router = express.Router();

router.get("/:id", async (req, res) => {
    try{
        let id = req.params.id;
        let issue = await IssueModel.findById(id);
        //console.log(issue);
        res.json(issue);
    }catch(e){
        res.sendStatus(500);
        console.error(e);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let { issueName, description, points, assignee, progress, estimatedTime } = req.body;
        let update = {
            issueName,
            description,
            points,
            assignee,
            progress,
            estimatedTime
        };
    
        console.log(id, update);
        await IssueModel.findByIdAndUpdate(id, update);
        res.sendStatus(200);
    }catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
});

module.exports = router;
