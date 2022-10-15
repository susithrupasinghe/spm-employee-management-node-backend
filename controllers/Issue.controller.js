const express = require("express");
const IssueModel = require("../models/Issue.model");
const router = express.Router();

const gellAllIssueToDo = async(req,res) => {
    IssueModel.find({projectId:req.query.id, progress: "todo"})
    .then((Issue)=>{
      res.status(200).json({
        success: true,
        message: 'Read successfuly',
        Issue
      })
    }).catch((e)=>{
      res.status(400).json({success:false, message: e.message, Issue: {}})
    })
  };

module.exports = {
  
    gellAllIssueToDo,

}; 
