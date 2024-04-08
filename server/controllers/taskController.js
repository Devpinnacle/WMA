const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Task = require("../models/Tasks");

//* Get Tasks **********************************************************

exports.getTasks = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { userGroupName } = user;
  const { _id: userId } = user;
  const { sectionId } = req.body;

  if (!sectionId) {
    return next(new AppError("Please provide Project ID.", 400));
  }

  let query = { sectionId, deletedStatus: false };

  if (userGroupName === "Super Admin" || userGroupName === "Administrator") {
    // For Super Admins or Administrators
    query = { ...query };
  } else if (userGroupName === "Software") {
    // For Software Users
    query = { ...query, assignedTo: userId };
  } else {
    return next(new AppError("Unknown User Group.", 400));
  }

  const tasks = await Task.find(query, {
    createdDate: 0,
    deletedStatus: 0,
    deletedBy: 0,
    deletedDate: 0,
  })
    .populate("createdBy", "userName")
    .populate("assignedTo", "userName");

  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

//* Add Tasks **********************************************************

exports.addTask = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const {
    taskName,
    startDate,
    dueDate,
    priority,
    status,
    stage,
    progress,
    duration,
    notes,
    assignedTo,
    sectionId,
    projectId,
  } = req.body;

  // Check if all required parameters are provided
  const requiredParams = [
    taskName,
    startDate,
    dueDate,
    priority,
    status,
    stage,
    assignedTo,
    sectionId,
    projectId,
  ];
  if (requiredParams.some((param) => !param)) {
    return next(
      new AppError("Please provide all the parameters for the task.", 400)
    );
  }

  // Ensure assignedTo is an array
  const assignedToArray = Array.isArray(assignedTo) ? assignedTo : [assignedTo];

  // Create tasks for each assigned user
  const tasks = await Promise.all(
    assignedToArray.map(async (element) => {
      const newTask = new Task({
        taskName,
        assignedDate: startDate,
        dueDate,
        status,
        stage,
        progress,
        priority,
        notes,
        duration,
        sectionId,
        projectId,
        createdBy: userId,
        assignedTo: element,
      });
      return await newTask.save();
    })
  );

  res.status(200).json({ status: "success", data: tasks });
});
