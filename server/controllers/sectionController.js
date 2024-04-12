const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Section = require("../models/Sections");
const User = require("../models/EmpDetails");
const Task = require("../models/Tasks");
const { dashedFormatDate, formatDate } = require("./helperFunction");

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
  const userId = req.user._id;
  const group = req.user.userGroupName;

  if (!projectId) {
    return next(new AppError("Please provide Project ID.", 400));
  }

  // Fetch sections with basic data
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
  )
    .populate("createdBy", "userName")

  // Process sections asynchronously and store the results
  if (group === "Software") {
    const updatedSections = await Promise.all(
      sections.map(async (section) => {
        const userTasks = await Task.find({
          sectionId: section._id,
          assignedTo: userId,
          deletedStatus: false,
        });

        const assigned = userTasks.length;

        const completedTasks = userTasks.filter(
          (task) => task.status === "Completed"
        ).length;

        const pendingTasks = userTasks.filter(
          (task) => task.status === "Pending"
        ).length;

        const inProgressTasks = userTasks.filter(
          (task) => task.status === "In Progress"
        ).length;

        const onHoldTasks = userTasks.filter(
          (task) => task.status === "On Hold"
        ).length;

        const totalProgress =
          userTasks.length > 0
            ? parseFloat(
                (
                  userTasks.reduce((sum, task) => sum + task.progress, 0) /
                  userTasks.length
                ).toFixed(2)
              )
            : 0;

        const overdueTasks = userTasks.filter((task) => {
          const now = Date.now() - 20000000;
          const dueDateTimestamp = new Date(task.dueDate).getTime();
          // console.log("now ",now)
          // console.log("due date ",task.dueDate)
          // console.log("due date ",now > dueDateTimestamp && task.status !== "Completed")
          return now > dueDateTimestamp && task.status !== "Completed";
        }).length;

        // Create a new object with updated data
        const updatedSection = {
          _id: section._id,
          sectionName: section.sectionName,
          projectId: section.projectId,
          startDate: section.startDate,
          dueDate: section.dueDate,
          progress: section.progress,
          totalTask: section.totalTask,
          createdBy: section.createdBy,
          assigned,
          completedTasks,
          pendingTasks,
          inProgressTasks,
          onHoldTasks,
          totalProgress: totalProgress ? totalProgress : 0,
          overdueTasks,
        };

        return updatedSection; // Return the newly created updated section
      })
    );
    console.log("updatedSection", updatedSections[0]);
    // Send the response with the updated sections
    res.status(200).json({
      status: "success",
      data: updatedSections,
    });
  } else {
    const updatedSections = await Promise.all(
      sections.map(async (section) => {
        const userTasks = await Task.find({
          sectionId: section._id,
          deletedStatus: false,
        });

        const assigned = userTasks.length;

        const completedTasks = userTasks.filter(
          (task) => task.status === "Completed"
        ).length;

        const pendingTasks = userTasks.filter(
          (task) => task.status === "Pending"
        ).length;

        const onHoldTasks = userTasks.filter(
          (task) => task.status === "On Hold"
        ).length;

        const overdueTasks = userTasks.filter((task) => {
          const now = Date.now() - 20000000;
          const dueDateTimestamp = new Date(task.dueDate).getTime();
          // console.log("now ",now)
          // console.log("due date ",task.dueDate)
          // console.log("due date ",now > dueDateTimestamp && task.status !== "Completed")
          return now > dueDateTimestamp && task.status !== "Completed";
        }).length;

        const updatedSection = {
          _id: section._id,
          sectionName: section.sectionName,
          projectId: section.projectId,
          startDate: section.startDate,
          dueDate: section.dueDate,
          progress: section.progress,
          totalTask: section.totalTask,
          createdBy: section.createdBy,
          assigned,
          completedTasks,
          pendingTasks,
          onHoldTasks,
          overdueTasks,
        };
        return updatedSection;
      })
    );
    res.status(200).json({
      status: "success",
      data: updatedSections,
    });
  }
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
