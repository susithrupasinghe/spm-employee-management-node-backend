const express = require("express");
const IssueModel = require("../models/Issue.model");
const router = express.Router();

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

module.exports = {
  getAllIssueToDo,
  passToInprograss,
  getAllIssueInprogres
};
