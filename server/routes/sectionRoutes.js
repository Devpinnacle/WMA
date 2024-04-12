const express = require("express");

const sectionControllers = require("../controllers/sectionController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.post("/getsection", sectionControllers.getSection);
router.post("/savesection", sectionControllers.addSection);
router.post("/deletesection", sectionControllers.deleteSections);
router.post("/editsection",sectionControllers.updateSection);

module.exports = router;
