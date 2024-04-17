const express = require("express");

const notificationControllers=require("../controllers/notificationController");
const authMiddlewares=require("../middlewares/authMiddlewares");

const router=express.Router();

router.use(authMiddlewares.protect);

router.post("/addNotifications",notificationControllers.addNotification);
router.get("/getNotifications",notificationControllers.getNotification);

module.exports=router;
