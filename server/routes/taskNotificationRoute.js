const express = require("express");

const taskNotificationControllers = require("../controllers/taskNotificationController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.post(
  "/getTaskNotifications",
  taskNotificationControllers.getTaskNotifications
);
router.post("/addProgressNotifications", taskNotificationControllers.progress);
router.post(
  "/addAssigndateNotifications",
  taskNotificationControllers.assignDate
);
router.post("/addDueDateNotification", taskNotificationControllers.dueDate);
router.post("/addStatusNotification", taskNotificationControllers.status);
router.post("/addPriorityNotification", taskNotificationControllers.priority);
router.post("/addStagesNotifications", taskNotificationControllers.stages);

module.exports = router;
