const express = require("express");
const { getAllEmployeesList , gellAllProjectEmployee} = require("../controllers/Employee.controller");
const router = express.Router();

router.get("/all",getAllEmployeesList);
router.get("/readEmployeeProject",gellAllProjectEmployee);

module.exports = router;
