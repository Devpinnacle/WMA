const express = require("express");

const notificationControllers = require("../controllers/notificationController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.post("/addNotifications", notificationControllers.addNotification);
router.get("/getNotifications", notificationControllers.getNotification);
router.post(
  "/notifyaddsection",
  notificationControllers.addSectionNotification
);
router.post(
  "/notifyeditsection",
  notificationControllers.editSectionNotification
);
router.post(
  "/notifydeletesection",
  notificationControllers.deleteSectionNotification
);
router.post("/notifyaddtask", notificationControllers.addTaskNotification);
router.post("/notifyedittask", notificationControllers.editTaskNotification);
router.post(
  "/notifydeletetask",
  notificationControllers.deleteTaskNotification
);
router.post(
  "/notifyprogresstask",
  notificationControllers.progressTaskNotification
);
router.post("/notifynotestask", notificationControllers.notesTaskNotification);

module.exports = router;
