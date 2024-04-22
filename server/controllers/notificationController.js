const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notification = require("../models/Notification");
const { addNotification } = require("./helperFunction");

//* Add notification ****************************************************
exports.addNotification = catchAsync(async (req, res, next) => {
  const group = req.user.userGroupName;

  const notificationData = {
    action: "has logged in",
    userId: req.body.userId,
    priority: "green",
    symbol: "log-outline",
  };

  if (group === "Software") {
    notificationData.empUserId = req.user._id;
  }

  const newNotification = new Notification(notificationData);
  await newNotification.save();
});

//* Get notification *****************************************************
exports.getNotification = catchAsync(async (req, res, next) => {
  let query = {};
  const group = req.user.userGroupName;

  if (group === "Software") {
    query.empUserId = req.user._id;
  }

  const notifications = await Notification.find(query)
    .populate("userId", "userName")
    .populate("projectId", "sctProjectName")
    .populate("sectionId", "sectionName")
    .populate("empUserId","userName");

  res.status(200).json({
    status: "success",
    data: notifications,
  });
});

//* Add section notification *****************************************************
exports.addSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;

  if (!projectId) {
    return next(new AppError("Please provide a project ID", 401));
  }

  const group = req.user.userGroupName;
  const notificationData = {
    action: "has added section in",
    userId: userId,
    priority: "yello",
    symbol: "add-outline",
    projectId: projectId,
  };

  if (group === "Software") {
    notificationData.empUserId = req.user._id;
  }

  const newNotification = new Notification(notificationData);
  await newNotification.save();

  res.status(200).json({
    status: "success",
    data:req.user._id
  });
});

//* Edit section notification *****************************************************
exports.editSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;
  const sectionId = req.body.sectionId;

  addNotification(
    userId,
    projectId,
    sectionId,
    "yello",
    "edit-outline",
    "has edited section in",
    res,
    next
  );
});

//* Delete section notification *****************************************************
exports.deleteSectionNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const projectId = req.body.projectId;
  const sectionId = req.body.sectionId;
  const group = req.user.userGroupName;

  addNotification(
    userId,
    projectId,
    sectionId,
    "red",
    "delete-outline",
    "has deleted section in",
    res,
    next,
    group === "Software" ? req.user._id : null
  );
});

//* Add task notification *****************************************************
exports.addTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { projectId, sectionId } = req.body;
  const group = req.user.userGroupName;

  const notificationsToAdd = [];

  if (group === "Software") {
    notificationsToAdd.push({
      userId: userId,
      projectId: projectId,
      sectionId: sectionId,
      priority: "yello",
      symbol: "add-outline",
      action: "has added task in",
      empUserId: req.user._id,
    });
  } else {
    const assignees = req.body.assignee;

    if (!Array.isArray(assignees)) {
      return next(new AppError("Assignees should be an array", 400));
    }

    assignees.forEach((assigneeId) => {
      notificationsToAdd.push({
        userId: userId,
        projectId: projectId,
        sectionId: sectionId,
        priority: "yello",
        symbol: "add-outline",
        action: "has added task in",
        empUserId: assigneeId,
      });
    });
  }

  // Save all notifications
  await Promise.all(
    notificationsToAdd.map(async (notification) => {
      const newNotification = new Notification(notification);
      await newNotification.save();
    })
  );

  // Send response
  res.status(200).json({
    status: "success",
    data:req.body.assignee?req.body.assignee:req.user._id
  });
});

//* Edit task notification *****************************************************
exports.editTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { projectId, sectionId } = req.body;
  const group = req.user.userGroupName;
  const notificationAction = "has edited task in";

  if (!projectId || !sectionId) {
    return next(new AppError("Please provide projectId and sectionId", 400));
  }

  const empUserId = group === "Software" ? req.user._id : req.body.Id;

  addNotification(
    userId,
    projectId,
    sectionId,
    "yello",
    "edit-outline",
    notificationAction,
    res,
    next,
    empUserId
  );
});

//* Delete task notification *****************************************************
exports.deleteTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { projectId, sectionId } = req.body;
  const group = req.user.userGroupName;
  const empUserId = (group === "Software") ? req.user._id : req.body.Id;

  addNotification(
    userId,
    projectId,
    sectionId,
    "red",
    "delete-outline",
    "has deleted task in",
    res,
    next,
    empUserId
  );
});

//* Update task progress notification *****************************************************
exports.progressTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { projectId, sectionId } = req.body;
  const group = req.user.userGroupName;
  const empUserId = (group === "Software") ? req.user._id : req.body.Id;
  addNotification(
    userId,
    projectId,
    sectionId,
    "yello",
    "progress-outline", 
    "has updated progress in",
    res,
    next,
    empUserId
  );
});

//* Add notes in task notification *****************************************************
exports.notesTaskNotification = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { projectId, sectionId } = req.body;
  const group = req.user.userGroupName;
  const empUserId = (group === "Software") ? req.user._id : req.body.Id;
  addNotification(
    userId,
    projectId,
    sectionId,
    "red",
    "critical-note-outline",
    "has addes notes in",
    res,
    next,
    empUserId
  );
});
