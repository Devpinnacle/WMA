const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//* Get model name *************************************************

const modelName = (Model) => Model.collection.modelName.toLowerCase();

//* Get doc By Id **************************************************
exports.getById=(Model)=>catchAsync(async(req,res,next)=>{
  const doc=await Model.findById(req.params.id)

  if(!doc){
    return next(
      new AppError(`No ${modelName(Model)} found with the provided ID`, 404)
    )
  }
  res.status(200).json({
    status: "SUCCESS",
    data: {
      user: doc,
    },
  });
})