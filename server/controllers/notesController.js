const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notes=require("../models/Notes");

exports.getNotes=catchAsync(async(req,res)=>{
    const userId=req.user._id;
    const notes=await Notes.find({userId})
    res.status(200).json({data:notes})
})