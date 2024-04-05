const express = require("express");

const taskControllers = require("../controllers/taskController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.post("/gettast",taskControllers.getTasks);
router.post("/addtask",taskControllers.addTask);

module.exports = router;
