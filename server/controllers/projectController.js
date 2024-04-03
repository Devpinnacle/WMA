const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project=require("../models/sctProjects")

//* Get Projects ***********************************************************

exports.getProjects=catchAsync(async(req,res,next)=>{
    const data=await Project.find({})
    res.status(200).json({
        data:data
    })
})