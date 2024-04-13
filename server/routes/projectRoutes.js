const express = require("express");

const projectControllers=require("../controllers/projectController");
const authMiddlewares=require("../middlewares/authMiddlewares");

const router=express.Router();

router.use(authMiddlewares.protect);

router.get("/getproject",projectControllers.getProjects);
router.post("/addproject",projectControllers.addProject);

module.exports=router;
