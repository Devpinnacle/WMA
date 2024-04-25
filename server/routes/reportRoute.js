const express = require("express");

const reportControllers = require("../controllers/reportController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.get("/getdailyreport",reportControllers.getDailyReport);

module.exports = router;