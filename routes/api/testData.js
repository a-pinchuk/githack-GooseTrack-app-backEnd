const express = require("express");
const ctrl = require("../../controllers/testData/testData");
const router = express.Router();

// * ADD task
router.post("/create_task", ctrl.createTestData);

module.exports = router;
