const express = require("express");

const notesControllers=require("../controllers/notesController");
const authMiddlewares=require("../middlewares/authMiddlewares");

const router=express.Router();

router.use(authMiddlewares.protect)

router.route("/getnotes").get(notesControllers.getNotes);

module.exports = router;