const express = require("express");
const {
     getAllEmployeesList,
     getEmployeedetails,
     loginEmployee,
     attendanceList,
     registerEmployee,
     updateEmployeeProfile,
     deleteEmployee,
     Markattendance,
    gellAllProjectEmployee} = require("../controllers/Employee.controller");
const router = express.Router();

router.get("/all",getAllEmployeesList);
router.get("/:email",getEmployeedetails);
router.post("/register", registerEmployee);
router.post("/attendence/:email",Markattendance);
router.delete("/:id", deleteEmployee);
router.put("/updateprofile/:id", updateEmployeeProfile);
router.get("/readEmployeeProject/:id",gellAllProjectEmployee);
router.post("/login", loginEmployee);
router.get("/attendenceList/:email",attendanceList)
module.exports = router;
