const express = require("express");

const chatsControllers = require("../controllers/chatController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.get("/getchats",chatsControllers.getchats)

module.exports=router;