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
    .populate("assignedTo", "userName")
    .populate("projectId", "sctProjectName")
    .populate("sectionId", ["sectionName", "progress"]);

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

  res.status(200).json({ status: "success" });
});

//* Update TasksSettings *****************************************************

exports.tskUpdate = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const {
    taskid,
    startDate,
    dueDate,
    priority,
    status,
    stage,
    progress,
    duration,
    notes,
  } = req.body;

  // Check if all required parameters are provided
  const requiredParams = [taskid, startDate, dueDate, priority, status, stage];
  if (requiredParams.some((param) => !param)) {
    return next(
      new AppError("Please provide all the parameters for the task.", 400)
    );
  }

  await Task.updateOne(
    { _id: taskid },
    {
      $set: {
        assignedDate: startDate,
        dueDate: dueDate,
        priority: priority,
        status: status,
        stage: stage,
        progress: status === "Completed" ? 100 : progress,
        duration: duration,
        notes: notes,
      },
    }
  );
  res.status(200).json({ status: "success" });
});

//* Update Daily task (Progress, Duration) *******************************

exports.dailyTaskUpdate = catchAsync(async (req, res, next) => {
  console.log("hit..Daily");
  const taskId = req.body.id;
  if (!taskId) {
    return next(new AppError("Please provide task id.", 400));
  }

  const status = await Task.find({ _id: taskId }, { status: 1 });
  await Task.updateOne(
    { _id: taskId },
    {
      $set: {
        progress: req.body.progress,
        duration: req.body.duration,
        status: req.body.progress === 100 ? "Completed" : status,
      },
    }
  );

  res.status(200).json({ status: "success" });
});

//* Update Notes *********************************************************

exports.updateNotes = catchAsync(async (req, res, next) => {
  const taskId = req.body.id;
  if (!taskId) {
    return next(new AppError("Please provide task id.", 400));
  }

  await Task.updateOne(
    { _id: taskId },
    {
      $set: {
        notes: req.body.notes ? req.body.notes : null,
      },
    }
  );

  res.status(200).json({ status: "success" });
});

//* delete task **********************************************************

exports.deleteTask = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const taskId = req.body.id;
  if (!taskId) {
    return next(new AppError("Please provide task id.", 400));
  }

  await Task.updateOne(
    { _id: taskId },
    {
      $set: {
        deletedStatus: true,
        deletedBy: userId,
        deletedDate: Date.now(),
      },
    }
  );
  res.status(200).json({ status: "success" });
});
