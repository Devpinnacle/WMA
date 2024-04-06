const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Section = require("../models/Sections");
const User = require("../models/EmpDetails");

//* Add Section ****************************************************

exports.addSection = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { sectionName, startDate, dueDate, projectId } = req.body;

  if (!sectionName || !startDate || !dueDate || !projectId) {
    return next(
      new AppError(
        "Please provide Section Name, Start Date, Project ID and Due Date.",
        400
      )
    );
  }

  const newSection = new Section({
    sectionName: sectionName,
    projectId: projectId,
    startDate: startDate,
    dueDate: dueDate,
    createdBy: userId,
  });
  await newSection.save();

  res.status(200).json({ data: "success" });
});

//* Get Section ****************************************************

exports.getSection = catchAsync(async (req, res, next) => {
  const { projectId } = req.body;

  if (!projectId) {
    return next(new AppError("Please provide Project ID.", 400));
  }

  const sections = await Section.find(
    { projectId: projectId, deletedStatus: false },
    {
      sectionName: 1,
      projectId: 1,
      startDate: 1,
      dueDate: 1,
      progress: 1,
      totalTask: 1,
      createdBy: 1,
    }
  ).populate("createdBy", "userName");

  res.status(200).json({
    status: "success",
    data: sections,
  });
});

//* Delete Section *************************************************

exports.deleteSections = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.body;

  if (!id) {
    return next(new AppError("Please Section id.", 400));
  }
  await Section.updateOne(
    { _id: id },
    {
      $set: { deletedStatus: true, deletedBy: userId, deletedDate: Date.now() },
    }
  );

  res.status(200).json({ data: "succsess" });
});
