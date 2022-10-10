const express = require("express");
const router = express.Router();

const {
    addDocumentation
} = require("../controllers/Documentation.controller");

router.put("/addDocumentation/:id",addDocumentation);

module.exports = router;
