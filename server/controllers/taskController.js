const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Task = require("../models/Tasks");
const Section = require("../models/Sections");

//* Get Tasks **********************************************************

exports.getTasks = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { userGroupName } = user;
  const { _id: userId } = user;
  const { sectionId } = req.body;

  if (!sectionId) {
    return next(new AppError("Please provide Section ID.", 400));
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

//* Get Selected Task ****************************************************
exports.getSelectedTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.body;

  if (!taskId) {
    return next(new AppError("Please provide task ID.", 400));
  }

  const task = await Task.find(
    { _id: taskId, deletedStatus: false },
    {
      createdDate: 0,
      deletedStatus: 0,
      deletedBy: 0,
      deletedDate: 0,
    }
  )
    .populate("createdBy", "userName")
    .populate("assignedTo", "userName")
    .populate("projectId", "sctProjectName")
    .populate("sectionId", ["sectionName", "progress"]);

  res.status(200).json({
    status: "success",
    data: task,
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
        assignedDate: new Date(startDate).setHours(0, 0, 0, 0),
        dueDate: new Date(dueDate).setHours(0, 0, 0, 0),
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
        completedDate:
          progress === 100 ? new Date().setHours(0, 0, 0, 0) : null,
      });
      return await newTask.save();
    })
  );

  const userTasks = await Task.find({
    sectionId: sectionId,
    deletedStatus: false,
  });

  const totalProgress =
    userTasks.length > 0
      ? parseFloat(
          (
            userTasks.reduce((sum, task) => sum + task.progress, 0) /
            userTasks.length
          ).toFixed(2)
        )
      : 0;

  await Section.updateOne({ _id: sectionId }, { progress: totalProgress });

  await Section.updateOne(
    { _id: sectionId },
    { $inc: { totalTask: assignedTo.length } }
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
    sectionId,
  } = req.body;

  // Check if all required parameters are provided
  const requiredParams = [
    taskid,
    startDate,
    dueDate,
    priority,
    status,
    stage,
    sectionId,
  ];
  if (requiredParams.some((param) => !param)) {
    return next(
      new AppError("Please provide all the parameters for the task.", 400)
    );
  }

  const task = await Task.find({ _id: taskid });
  if (task.status !== "Completed" && status === "Completed") {
    await Task.updateOne(
      { _id: taskid },
      {
        $set: {
          progressUpdateDate: new Date(),
          completedDate: new Date().setHours(0, 0, 0, 0),
        },
      }
    );
  }

  if (task.status === "Completed" && status !== "Completed") {
    await Task.updateOne(
      { _id: taskid },
      { $set: { progressUpdateDate: new Date(), completedDate: null } }
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

  const userTasks = await Task.find({
    sectionId: sectionId,
    deletedStatus: false,
  });

  const totalProgress =
    userTasks.length > 0
      ? parseFloat(
          (
            userTasks.reduce((sum, task) => sum + task.progress, 0) /
            userTasks.length
          ).toFixed(2)
        )
      : 0;

  await Section.updateOne({ _id: sectionId }, { progress: totalProgress });
  res.status(200).json({ status: "success" });
});

//* Update Daily task (Progress, Duration) *******************************

exports.dailyTaskUpdate = catchAsync(async (req, res, next) => {
  const taskId = req.body.id;
  if (!taskId) {
    return next(new AppError("Please provide task id.", 400));
  }

  const data = await Task.find(
    { _id: taskId },
    { status: 1, _id: 0, progress: 1, progressUpdateDate:1 }
  );
  const status = data[0].status;
  const progress = data[0].progress;
  const date = data[0].progressUpdateDate;

  await Task.updateOne(
    { _id: taskId },
    {
      $set: {
        progress: req.body.progress,
        duration: req.body.duration,
        progressUpdateDate: req.body.progress === progress ? date : new Date(),
        status: req.body.progress === 100 ? "Completed" : status,
        completedDate:
          req.body.progress === 100 ? new Date().setHours(0, 0, 0, 0) : null,
      },
    }
  );

  const userTasks = await Task.find({
    sectionId: req.body.sectionId,
    deletedStatus: false,
  });

  const totalProgress =
    userTasks.length > 0
      ? parseFloat(
          (
            userTasks.reduce((sum, task) => sum + task.progress, 0) /
            userTasks.length
          ).toFixed(2)
        )
      : 0;

  await Section.updateOne(
    { _id: req.body.sectionId },
    { progress: totalProgress }
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
  const sectionId = req.body.secId;
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
  const userTasks = await Task.find({
    sectionId: sectionId,
    deletedStatus: false,
  });

  const totalProgress =
    userTasks.length > 0
      ? parseFloat(
          (
            userTasks.reduce((sum, task) => sum + task.progress, 0) /
            userTasks.length
          ).toFixed(2)
        )
      : 0;

  await Section.updateOne({ _id: sectionId }, { progress: totalProgress });

  await Section.updateOne({ _id: sectionId }, { $inc: { totalTask: -1 } });

  res.status(200).json({ status: "success" });
});

//* Adjust task **********************************************************

exports.adjustTask = catchAsync(async (req, res, next) => {
  const { initialStartDt, movedStartDt, sectionId } = req.body;

  // Calculate the difference in days between the initial and moved section start dates
  const initialStartDate = new Date(initialStartDt);
  const movedStartDate = new Date(movedStartDt);
  const dateDifference =
    (movedStartDate - initialStartDate) / (1000 * 60 * 60 * 24); // Difference in days

  // Find all tasks belonging to the specified section
  const tasks = await Task.find({ sectionId });

  // Adjust task dates
  const adjustedTasks = tasks.map((task) => {
    // Calculate new assigned date and due date for each task
    const newAssignedDate = new Date(task.assignedDate);
    const newDueDate = new Date(task.dueDate);
    newAssignedDate.setDate(newAssignedDate.getDate() + dateDifference);
    newDueDate.setDate(newDueDate.getDate() + dateDifference);

    // Update task with new dates
    return Task.findByIdAndUpdate(task._id, {
      assignedDate: newAssignedDate,
      dueDate: newDueDate,
    });
  });

  // Execute all updates and wait for them to complete
  await Promise.all(adjustedTasks);

  res.status(200).json({ status: "success" });
});

//* Today's task **********************************************************
exports.todaysTask = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const tasks = await Task.find(
    {
      assignedTo: userId,
      deletedStatus: false,
      $or: [
        {
          $and: [
            { status: "In Progress" },
            { assignedDate: { $lte: new Date() } },
          ],
        },
        { $and: [{ status: "To Do" }, { assignedDate: { $lte: new Date() } }] },
      ],
    },
    {
      createdDate: 0,
      deletedStatus: 0,
      deletedBy: 0,
      deletedDate: 0,
    }
  )
    .populate("createdBy", "userName")
    .populate("assignedTo", "userName")
    .populate("projectId", "sctProjectName")
    .populate("sectionId", ["sectionName", "progress"]);

  const currentDate = new Date();

  const tasksWithProgressToday = tasks.filter((task) => {
    const progressUpdateDate = task.progressUpdateDate;
    return (
      progressUpdateDate &&
      progressUpdateDate.toDateString() === currentDate.toDateString()
    );
  });

  const count = tasksWithProgressToday.length;

  res
    .status(200)
    .json({ status: "success", data: { data: tasks, count: count } });
});
