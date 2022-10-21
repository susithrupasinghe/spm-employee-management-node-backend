var express = require('express');
const { isValidObjectId } = require('mongoose');
const auth = require('../middleware/auth');
const DocumentationModel = require('../models/Documentation.model');
const Documentation = require("../models/Documentation.model");
var router = express.Router();
var mongoose = require('mongoose');

//Add 
// const addDocumentation = async (req, res) => {
//     const { documentationTitle,description } = req.body;
  
//     try {
//       const newDocument = new Documentation({ documentationTitle,description });
//       //save
//       await newDocument
//         .save()
//         .then(async () => {
//           res.json(Documentation);
//         })
//         .catch((err) => res.status(400).json("Error: " + err));
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   };

//add documentation
// router.post('/addDocumentation',function

const addDocumentation = (req, res, next)=>{

  const Documentation = new DocumentationModel({
    projectId: req.query.projectId,
    documentationTitle: req.body.documentationTitle,
    documentationDescription: req.body.documentationDescription,
    status:"true"
  });

  try{
    Documentation.save();
    res.status(200).json(
      {
        succuss: true,
        message: 'Insertion succussfull',
        payload: {}
      }
    );
  }
  catch (error) {
    res.status(400).json(
      {
        message: 'Cannot add data right now!'
      }
    );
  }
};

//get documentation by projectID
// router.get('/readDocmentationByProject',function
const readDocumentation = (req,res,next)=>{
  DocumentationModel.find({projectId:req.query.id,status:'true'})
  .then((Document)=>{
    res.status(200).json({
      success: true,
      message: 'Read successfuly',
      Document
    })
  }).catch((e)=>{
    res.status(400).json({success:false, message: e.message, payload: {}})
  })
};

//get documentation description
// router.get('/readDocmentationDescription',function
const readDocmentationDescription = (req,res,next)=>{
  DocumentationModel.find({_id:req.query.id,status:'true'})
  .then((DocumentDes)=>{
    res.status(200).json({
      success: true,
      message: 'Read successfuly',
      DocumentDes
    })
  }).catch((e)=>{
    res.status(400).json({
      success:false, 
      message: e.message, 
      payload: {}})
  })
};

//delete documentation
// router.delete('/deleteDoc', function
const deleteDoc = (req, res, next)=> {

  DocumentationModel.updateOne({ _id: req.query.id }, { $set: { status: 'false' } })
    .then((result) => {
      res.json({
        success: true,
        message: 'Deleted sucessful',
        payload: {}
      })
    }).catch((e) => {
      res.status(400).json({ 
        success: false, 
        message: e.message, 
        payload: {} })
    })
};

//update documentation
// router.post('/updateDetails', 
const updateDetails = (req, res, next) => {

  console.log("heheeeeeeeeeeeeeeeeeee");

  DocumentationModel.updateOne({ _id : req.query.id },
    {
      $set: {
        "documentationTitle": req.body.documentationTitle,
        "documentationDescription": req.body.documentationDescription,
      }
    })
    .then((result) => {
     
      res.json({
        success: true,
        message: 'Update sucessful',
        payload: result
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
};

module.exports = {
  addDocumentation,
  readDocumentation,
  readDocmentationDescription,
  deleteDoc,
  updateDetails
}