const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notification = require("../models/Notification");
const {}=require("./helperFunction")

//* Add notification ****************************************************
exports.addNotification = catchAsync(async (req, res, next) => {
  const newNotification = new Notification({
    action: "has logged in",
    userId: req.body.userId,
    priority: "green",
    symbol: "log-outline",
  });
  await newNotification.save();
});

//* Get notification *****************************************************
exports.getNotification = catchAsync(async (req, res, next) => {
  const group = req.user.userGroupName;
  if (group === "Software") {
  } else {
    const notifications = await Notification.find({})
      .populate("userId", "userName")
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName");

    res.status(200).json({
      status: "success",
      data: notifications,
    });
  }
});

//* Add section notification *****************************************************
exports.addSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;

  if (!projectId) {
    next(new AppError("please provide section id", 400));
  }
  const newNotification = new Notification({
    action: "has added section in",
    userId: userId,
    priority: "yello",
    symbol: "add-outline",
    projectId: projectId,
  });
  await newNotification.save();
  res.status(200).json({
    status: "success",
  });
});

//* Edit section notification *****************************************************
exports.editSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;
  const sectionId = req.body.sectionId;

  if (!projectId) {
    next(new AppError("please provide project id and section id", 400));
  }
  const newNotification = new Notification({
    action: "has edited section in",
    userId: userId,
    priority: "yello",
    symbol: "edit-outline",
    projectId: projectId,
    sectionId: sectionId,
  });
  await newNotification.save();

  res.status(200).json({
    status: "success",
  });
});

//* Delete section notification *****************************************************
exports.deleteSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;
  const sectionId = req.body.sectionId;

  if (!projectId) {
    next(new AppError("please provide project id and section id", 400));
  }
  const newNotification = new Notification({
    action: "has deleted section in",
    userId: userId,
    priority: "red",
    symbol: "delete-outline",
    projectId: projectId,
    sectionId: sectionId,
  });
  await newNotification.save();
  res.status(200).json({
    status: "success",
  });
});

//* Add task notification *****************************************************
exports.addTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const {projectId,sectionId} = req.body

  if (!projectId||!sectionId) {
    next(new AppError("please provide project id and section id", 400));
  }
  const newNotification = new Notification({
    action: "has added task in",
    userId: userId,
    priority: "yello",
    symbol: "add-outline",
    projectId: projectId,
  });
  await newNotification.save();
  res.status(200).json({
    status: "success",
  });
});