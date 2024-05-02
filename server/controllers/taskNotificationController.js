const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const TaskNotification = require("../models/taskNotifications");
const { addTaskNotification, dashedFormatDate } = require("./helperFunction");

//* Get notification *****************************************************
exports.getTaskNotifications = catchAsync(async (req, res, next) => {
 
  const { taskId } = req.body;
  if (!taskId) {
    return next(new AppError("Invalid Credentials!", 401));
  }
  const taskNotification = await TaskNotification.find({taskId:taskId}).populate(
    "userId",
    "userName"
  ); 

  console.log("hit get notification",taskNotification)

  res.status(200).json({
    status: "success",
    data: taskNotification,
  });
});

//* Add progress *********************************************************
exports.progress = catchAsync(async (req, res, next) => {
  console.log("hit progress")
  const { taskId, newData } = req.body;
  const userId = req.user._id;

  addTaskNotification(
    userId,
    taskId,
    "updated progress to",
    newData,
    res,
    next
  );
});

//* Add TA ***************************************************************
exports.assignDate = catchAsync(async (req, res, next) => {
  const { taskId, newData } = req.body;
  const userId = req.user._id;
  const date=dashedFormatDate(newData)
  // console.log("date is",typeof(date))
  addTaskNotification(
    userId,
    taskId,
    "edited assign date to",
    date,
    res,
    next
  );
});

//* Add TD ***************************************************************
exports.dueDate = catchAsync(async (req, res, next) => {
  const { taskId, newData } = req.body;
  const userId = req.user._id;
  const date=dashedFormatDate(newData)

  addTaskNotification(userId, taskId, "edited due date to", date, res, next);
});

//* Add status ***************************************************************
exports.status = catchAsync(async (req, res, next) => {
  const { taskId, newData } = req.body;
  const userId = req.user._id;

  addTaskNotification(userId, taskId, "edited status to", newData, res, next);
});

//* Add priority ***************************************************************
exports.priority = catchAsync(async (req, res, next) => {
  const { taskId, newData } = req.body;
  const userId = req.user._id;

  addTaskNotification(userId, taskId, "edited priority to", newData, res, next);
});

//* Add stages ***************************************************************
exports.stages = catchAsync(async (req, res, next) => {
  const { taskId, newData } = req.body;
  const userId = req.user._id;

  addTaskNotification(userId, taskId, "edited stages to", newData, res, next);
});
