const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notification = require("../models/Notification");

//* Add notification ****************************************************
exports.addNotification = catchAsync(async (req, res, next) => {
  const newNotification = new Notification({
    action: "has logged in",
    userId: req.body.userId,
    priority: "low",
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
