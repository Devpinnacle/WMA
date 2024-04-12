const express = require("express");

const taskControllers = require("../controllers/taskController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.post("/gettast", taskControllers.getTasks);
router.post("/addtask", taskControllers.addTask);
router.post("/updatetasksettings", taskControllers.tskUpdate);
router.post("/updatedailytask", taskControllers.dailyTaskUpdate);
router.post("/updatenotes", taskControllers.updateNotes);
router.post("/deletetask",taskControllers.deleteTask);
router.post("/adjusttask",taskControllers.adjustTask);

module.exports = router;
