const express = require("express");
const router = express.Router();

const {
    addDocumentation,
    readDocumentation,
    readDocmentationDescription,
    deleteDoc,
    updateDetails
    } = require("../controllers/Documentation.controller");

//ihxauhsiuasod

router.post('/addDocumentation', addDocumentation);
router.get('/readDocmentationByProject', readDocumentation)
router.get('/readDocmentationDescription', readDocmentationDescription)
router.delete('/deleteDoc', deleteDoc)
router.put('/updateDetails', updateDetails)

module.exports = router;
