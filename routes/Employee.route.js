const express = require("express");
const router = express.Router();

const {
    getEmployeeDetailsById
} = require("../controllers/Employee.controller");

router.get("/:id", getEmployeeDetailsById);

module.exports = router;
