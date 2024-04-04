const express = require("express");

const sectionControllers = require("../controllers/sectionController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.use(authMiddlewares.protect);

router.get("/getsection", sectionControllers.getSection);
router.post("/savesection", sectionControllers.addSection);

module.exports = router;
