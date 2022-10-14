const express = require("express");
const {
     getAllEmployeesList,
     registerEmployee,
     updateEmployeeProfile,
     deleteEmployee,
    gellAllProjectEmployee} = require("../controllers/Employee.controller");
const router = express.Router();

router.get("/all",getAllEmployeesList);
router.post("/register", registerEmployee);
router.delete("/:id", deleteEmployee);
router.put("/updateprofile/:id", updateEmployeeProfile);
router.get("/readEmployeeProject",gellAllProjectEmployee);

module.exports = router;
