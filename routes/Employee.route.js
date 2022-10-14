const express = require("express");
const {
     getAllEmployeesList,
     registerEmployee,
     updateEmployeeProfile,
     deleteEmployee,
    } = require("../controllers/Employee.controller");
const router = express.Router();

router.get("/all",getAllEmployeesList);
router.post("/register", registerEmployee);
router.delete("/:id", deleteEmployee);
router.put("/updateprofile/:id", updateEmployeeProfile);

module.exports = router;
