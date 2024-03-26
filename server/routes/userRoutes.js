const express = require("express");

const userControllers=require("../controllers/userController");
const authMiddlewares=require("../middlewares/authMiddlewares");

const router=express.Router();

router.post("/login",userControllers.login);

router.route("/me").get()