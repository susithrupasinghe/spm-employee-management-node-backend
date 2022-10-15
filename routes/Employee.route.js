const express = require("express");
const {
     getAllEmployeesList,
     getEmployeedetails,
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
router.get("/readEmployeeProject",gellAllProjectEmployee);

module.exports = router;
