var express = require('express');
const auth = require('../middleware/auth');
const EmployeeModel = require('../models/Employee.model');
const Employee = require("../models/Employee.model");
const Attendence = require("../models/Attendence.model");
const ProjectModel = require('../models/Project.model');
const config = require("config");
const jwt = require("jsonwebtoken");
var router = express.Router();
const bcrypt = require("bcryptjs");



//get Employee details by employe Id
// const getEmployeeDetailsById = async (req, res) => {

//     try {
//       //get user details
//       //-password : dont return the pasword
//       const user = await Employee.findById(req.params.id)
//         .select("-password")
//         .populate({
//           path: "projectsList",
//           populate: {
//             path: "projectManager",
//             select: "name",
//           },
//         })
//         .populate({ path: "attendanceList", model: "Attendence" })
//         .populate({
//           path: "projectsList",
//           populate: {
//             path: "sprintList",
//             match: { isClosed: false }, //filter not closed sprints
//             populate: [
//               {
//                 path: "toDoList",
//                 model: "Issue",
//                 match: { assignee: req.params.id },
//               },
//               {
//                 path: "inProgressList",
//                 model: "Issue",
//                 match: { assignee: req.params.id },
//               },
//               {
//                 path: "doneList",
//                 model: "Issue",
//                 match: { assignee: req.params.id },
//               },
//             ],
//           },
//         });
//       res.json(user);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send("Server Error");
//     }
//   };

//get Employee details by employe Id
// router.get('/readEmployeeProject',function(req,res,next){
//   ProjectModel.find({employeeList:req.query.id})
//   .then((Project)=>{
//     res.status(200).json({
//       success: true,
//       message: 'Read successfuly',
//       Project
//     })
//   }).catch((e)=>{
//     res.status(400).json({success:false, message: e.message, payload: {}})
//   })
// });

const gellAllProjectEmployee = async(req,res) => {

  console.log("Fuuuuuo");
  return ProjectModel.find({employeeList:req.params.id})
  .then((Project)=>{
    return res.status(200).json({
      success: true,
      message: 'Read successfuly',
      Project
    });
  }).catch((e)=>{
    res.status(400).json({success:false, message: e.message, payload: {}})
  })
};

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Employee.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log(config.get("jwtSecret"));

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};



//Register user
const registerEmployee = async (req, res) => {
  const {username, email, password, mobileNumber, department, rate,role } =
    req.body;

  try {
    //See if user Exist
    let user = await Employee.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employee already exist" }] });
    }

    const profileImg =
      "https://firebasestorage.googleapis.com/v0/b/econnecteee.appspot.com/o/profileImg.jpg?alt=media&token=46df70d2-9365-4a45-af63-b21c44585f9c";

    const salary = 0.0;
    const firstName = "";
    const lastName = "";
    const address = "";
    //create a user instance
    user = new Employee({
      username,
      email,
      password,
      mobileNumber,
      department,
      rate,
      salary,
      profileImg,
      role,
      firstName,
      lastName,
      address,
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    const salt = await bcrypt.genSalt(10);

    //hashing password
    user.password = await bcrypt.hash(password, salt);

    //save user to the database
    await user.save().then((response) => {
      res.json(response);
    });
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Update profile employee
const updateEmployeeProfile = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);

    if (user != null) {
      Employee.findByIdAndUpdate(req.params.id).then(async (userProfile) => {
        userProfile.username = req.body.username;
        userProfile.mobileNumber = req.body.mobileNumber;
        userProfile.firstName = req.body.firstName;
        userProfile.lastName = req.body.lastName;
        userProfile.address = req.body.address;
        if (req.body.password) {
          //Encrypt Password
          //10 is enogh..if you want more secured.user a value more than 10
          const salt = await bcrypt.genSalt(10);
          //hashing password
          userProfile.password = await bcrypt.hash(req.body.password, salt);
        }

        userProfile
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);
      await Employee.findByIdAndDelete(req.params.id)
        .then(() => {
          res.json("Employee Deleted");
        })
        .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//Confirm  - Attendence
const Markattendance= async (req, res) => {
  const email = req.params.email;
  try {
    const user = await Employee.findOne({email:email});
    console.log(req.params.email);
    if (user != null) {
      console.log("confit");
      Employee.findOneAndUpdate({email:email}).then(async () => {
        const { inTime, date,outTime } = req.body;
        try {
          const newAttendenceObj = new Attendence({
            inTime,
            date,
            outTime,
          });

          //save attendance to the database
          await newAttendenceObj
            .save()
            .then(async (createdAttendenceObj) => {
              user.attendanceList.unshift(createdAttendenceObj);
              // await calculateEmpSalary(req.params.userid);
              await user.save();
              res.json(user);
            })
            .catch((err) => res.status(400).json("Error: " + err));
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};



const getAllEmployeesList = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const empList = await Employee.find().select("-password");
    res.json(empList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getEmployeedetails = async (req, res) => {
  const email = req.params.email;
  try {
    const emp = await Employee.findOne({email:email}).select("-password");
    res.json(emp);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};


  
module.exports = {
  getAllEmployeesList,
  getEmployeedetails,
  gellAllProjectEmployee,
  registerEmployee,
  updateEmployeeProfile,
  deleteEmployee,
  Markattendance,
  loginEmployee,
}; 
