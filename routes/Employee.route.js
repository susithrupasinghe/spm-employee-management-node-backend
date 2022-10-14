const express = require("express");
const { getAllEmployeesList } = require("../controllers/Employee.controller");
const router = express.Router();

router.get("/all",getAllEmployeesList);

module.exports = router;
