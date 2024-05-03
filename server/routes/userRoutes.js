const express = require("express");

const userControllers=require("../controllers/userController");
const authMiddlewares=require("../middlewares/authMiddlewares");
const refreshAccessToken=require("../controllers/refreshTokenController")

const router=express.Router();

router.post("/login",userControllers.login);
router.get("/refresh", refreshAccessToken);
router.patch("/logout", userControllers.logout);
router.use(authMiddlewares.protect);

router.route("/me").get(userControllers.getUser);
router.get("/getswuser",userControllers.getSwUsers);

module.exports = router;