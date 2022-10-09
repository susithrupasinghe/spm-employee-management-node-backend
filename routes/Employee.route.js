const express = require("express");
const router = express.Router();

const {
    getEmployeeDetailsById
} = require("../controllers/Employee.contoller");

router.get("/:id", getEmployeeDetailsById);
