const express = require("express");
const EmployeeModel = require("../models/Employee.model");
const IssueModel = require("../models/Issue.model");

//get todo list
const getAllIssueToDo = async (req, res) => {
  IssueModel.find({ projectId: req.params.id, progress: "todo" })
    .then((Issue) => {
      res.status(200).json({
        success: true,
        message: "Read successfuly",
        Issue,
      });
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: e.message, Issue: {} });
    });
};

//get todo list
const getAllIssueInprogres = async (req, res) => {
    IssueModel.find({ projectId: req.params.id, progress: "inprogress" })
      .then((Issue) => {
        res.status(200).json({
          success: true,
          message: "Read successfuly",
          Issue,
        });
      })
      .catch((e) => {
        res.status(400).json({ success: false, message: e.message, Issue: {} });
      });
  };

//pass to inprograss
const passToInprograss = async (req, res) => {
    IssueModel.updateOne(
    { projectId: req.query.id },
    { $set: { progress: "inprogress" } }
  )
    .then((result) => {
      res.json({
        success: true,
        message: "Sucessful",
        result,
      });
    })
    .catch((e) => {
      res.status(400).json({
        success: false,
        message: e.message,
        payload: {},
      });
    });
};

const updateIssue = async (req, res) => {
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
}; 

const getIssue = async (req, res) => {
    try{
        let id = req.params.id;
        let issue = await IssueModel.findById(id);
        //console.log(issue);
        res.json(issue);
    }catch(e){
        res.sendStatus(500);
        console.error(e);
    }
};

module.exports = {
  getAllIssueToDo,
  passToInprograss,
  getAllIssueInprogres,
  updateIssue,
  getIssue
};
