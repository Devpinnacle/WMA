const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project = require("../models/sctProjects");
const Task = require("../models/Tasks");
const Section = require("../models/Sections");
const Daily = require("../models/DailyReport");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//* Get DailyReport ***********************************************************

// exports.getDailyReport = catchAsync(async (req, res, next) => {
//   const dailyReport = await Daily.find({})
//     .populate("userId", "userName")
//     .populate("projectId", ["_id", "sctProjectName"])
//     .populate("sectionId", ["_id", "sectionName", "dueDate"])
//     .populate("taskId", ["_id", "taskName", "assignedDate", "dueDate"]);

//   // Initialize an empty array to store the grouped data
//   const groupedData = [];

//   // Iterate over each daily report entry
//   dailyReport.forEach(entry => {
//     const date = entry.date;
//     const userName = entry.userId.userName;
//     const projectId = entry.projectId._id;
//     const projectName = entry.projectId.sctProjectName;
//     const sectionId = entry.sectionId._id;
//     const sectionName = entry.sectionId.sectionName;
//     const sectionDue = entry.sectionId.dueDate;

//     // Check if the date exists in the groupedData array
//     let dateIndex = groupedData.findIndex(item => item.date === date);
//     if (dateIndex === -1) {
//       // If date doesn't exist, create a new date entry
//       dateIndex = groupedData.push({ date: date, data: [] }) - 1;
//     }

//     // Check if the user exists in the groupedData array
//     let userIndex = groupedData[dateIndex].data.findIndex(item => item.name === userName);
//     if (userIndex === -1) {
//       // If user doesn't exist, create a new user entry
//       userIndex = groupedData[dateIndex].data.push({ name: userName, taskCount: 0, nameData: [] }) - 1;
//     }

//     // Increment the task count for the user
//     groupedData[dateIndex].data[userIndex].taskCount++;

//     // Check if the project exists in the groupedData array
//     let projectIndex = groupedData[dateIndex].data[userIndex].nameData.findIndex(item => item.projectId === projectId);
//     if (projectIndex === -1) {
//       // If project doesn't exist, create a new project entry
//       projectIndex = groupedData[dateIndex].data[userIndex].nameData.push({ projectId: projectId, projectName: projectName, taskCount: 0, projectData: [] }) - 1;
//     }

//     // Increment the task count for the project
//     groupedData[dateIndex].data[userIndex].nameData[projectIndex].taskCount++;

//     // Check if the section exists in the groupedData array
//     let sectionIndex = groupedData[dateIndex].data[userIndex].nameData[projectIndex].projectData.findIndex(item => item.sectionId === sectionId);
//     if (sectionIndex === -1) {
//       // If section doesn't exist, create a new section entry
//       sectionIndex = groupedData[dateIndex].data[userIndex].nameData[projectIndex].projectData.push({ sectionId: sectionId, sectionName: sectionName, sectionDue: sectionDue, taskCount: 0, sectionData: [] }) - 1;
//     }

//     // Increment the task count for the section
//     groupedData[dateIndex].data[userIndex].nameData[projectIndex].projectData[sectionIndex].taskCount++;

//     // Push the task data into the appropriate section entry
//     groupedData[dateIndex].data[userIndex].nameData[projectIndex].projectData[sectionIndex].sectionData.push({
//       taskId: entry.taskId._id,
//       taskName: entry.taskId.taskName,
//       assignedDate: entry.taskId.assignedDate,
//       dueDate: entry.taskId.dueDate,
//       stages: entry.stages,
//       duration: entry.duration,
//       status: entry.status,
//       progress: entry.progress,
//       notes: entry.notes,
//     });
//   });

//   res.status(200).json({
//     status: "success",
//     data: groupedData,
//   });
// });

exports.getDailyReport = catchAsync(async (req, res, next) => {
  const groupedData = await Daily.aggregate([
    {
      $lookup: {
        from: "empdetails",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "sctprojects",
        localField: "projectId",
        foreignField: "_id",
        as: "project",
      },
    },
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "section",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$project",
    },
    {
      $unwind: "$section",
    },
    {
      $unwind: "$task",
    },
    {
      $group: {
        _id: "$date",
        data: {
          $push: {
            name: "$user.userName",
            userId: "$user._id",
            projectName: "$project.sctProjectName",
            sectionName: "$section.sectionName",
            sectionDue: "$section.dueDate",
            taskName: "$task.taskName",
            assignedDate: "$task.assignedDate",
            dueDate: "$task.dueDate",
            stages: "$stages",
            duration: "$duration",
            status: "$status",
            progress: "$progress",
            notes: "$notes",
          },
        },
      },
    },
  ]);

  console.log(groupedData);

  res.status(200).json({
    status: "success",
    data: groupedData,
  });
});

//* Get Project Report ***********************************************************
exports.ProjectReport = catchAsync(async (req, res, next) => {
  const projects = await Project.find(
    {},
    { tags: 1, sctProjectName: 1, sctProjectEnteredById: 1 }
  ).populate("sctProjectEnteredById", "userName");

  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      const userTasks = await Task.find({
        projectId: project._id,
        deletedStatus: false,
      });

      const sections = await Section.find({
        projectId: project._id,
        deletedStatus: false,
      });

      const assigned = userTasks.length;
      const sectionLen = sections.length;

      const pendingTasks = userTasks.filter(
        (task) => task.status === "Pending"
      ).length;

      const inProgressTasks = userTasks.filter(
        (task) => task.status === "In Progress"
      ).length;

      const completedTasks = userTasks.filter(
        (task) => task.status === "Completed"
      ).length;

      const overdueTasks = userTasks.filter((task) => {
        const now = Date.now() - 20000000;
        const dueDateTimestamp = new Date(task.dueDate).getTime();
        return now > dueDateTimestamp && task.status !== "Completed";
      }).length;

      const updatedProject = {
        _id: project._id,
        sctProjectName: project.sctProjectName,
        sctProjectEnteredById: project.sctProjectEnteredById,
        tags: project.tags,
        pendingTasks,
        inProgressTasks,
        assigned,
        completedTasks,
        overdueTasks,
        sectionLen,
      };
      return updatedProject;
    })
  );
  res.status(200).json({
    status: "success",
    data: updatedProjects,
  });
});

//* Get Project's tasks ***********************************************************

exports.tasksReport = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return next(new AppError("Please Project id.", 400));
  }
  console.log("id is...", id);

  const tasks = await Task.aggregate([
    {
      $match: {
        projectId: new ObjectId(id),
        deletedStatus: false,
      },
    },
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "sections",
      },
    },
    {
      $lookup: {
        from: "empdetails",
        localField: "assignedTo",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: "$sections",
    },
    {
      $unwind: "$users",
    },
    {
      $group: {
        _id: "$sectionId",
        sectionName: {
          $first: "$sections.sectionName",
        },
        data: {
          $push: {
            taskName: "$taskName",
            assignee: "$users.userName",
            startDate: "$assignedDate",
            endDate: "$dueDate",
            priority: "$priority",
            status: "$status",
            stage: "$stage",
            duration: "$totalDuration",
            progress: "$progress",
            completedDate: "$completedDate",
          },
        },
      },
    },
  ]);

  // console.log(tasks);
  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

//* Get  Single User ***********************************************************

exports.userTaskReport = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return next(new AppError("Please Project id.", 400));
  }

  const tasks = await Task.aggregate([
    {
      $match: {
        assignedTo: new ObjectId(id),
        deletedStatus: false,
      },
    },
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "sections",
      },
    },
    {
      $lookup: {
        from: "empdetails",
        localField: "assignedTo",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "sctprojects",
        localField: "projectId",
        foreignField: "_id",
        as: "projects",
      },
    },
    {
      $unwind: "$sections",
    },
    {
      $unwind: "$users",
    },
    {
      $unwind: "$projects",
    },
    {
      $group: {
        _id: "$sectionId",
        sectionName: {
          $first: "$sections.sectionName",
        },
        projectId: {
          $first: "$projectId",
        },
        projectName: {
          $first: "$projects.sctProjectName",
        },
        count: {
          $sum: 1,
        },
        data: {
          $push: {
            taskName: "$taskName",
            assignee: "$users.userName",
            startDate: "$assignedDate",
            endDate: "$dueDate",
            priority: "$priority",
            status: "$status",
            stage: "$stage",
            duration: "$totalDuration",
            progress: "$progress",
            completedDate: "$completedDate",
          },
        },
      },
    },
    {
      $group: {
        _id: "$projectId",
        projectName: {
          $first: "$projectName",
        },
        count:{$sum:"$count"},
        data: {
          $push: {
            data: "$data",
            sectionName: "$sectionName",
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

//* Get  Single User ***********************************************************

exports.userReport = catchAsync(async (req, res, next) => {
  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "sections",
      },
    },
    {
      $lookup: {
        from: "empdetails",
        localField: "assignedTo",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "sctprojects",
        localField: "projectId",
        foreignField: "_id",
        as: "projects",
      },
    },
    {
      $unwind: "$sections",
    },
    {
      $unwind: "$users",
    },
    {
      $unwind: "$projects",
    },
    {
      $group: {
        _id: "$assignedTo",
        userName: {
          $first: "$users.userName",
        },
        totalProjects: {
          $addToSet: "$projectId",
        },
        // Total number of projects
        totalSections: {
          $addToSet: "$sections._id",
        },
        // Total number of sections
        totalTasks: {
          $sum: 1,
        },
        // Total number of tasks
        completedTasks: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "Completed"],
              },
              1,
              0,
            ],
          },
        },
        pendingTasks: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "Pending"],
              },
              1,
              0,
            ],
          },
        },
        dueTasks: {
          $sum: {
            $cond: [
              {
                $lt: ["$dueDate", new Date()],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        // Exclude the _id field
        userName: "$userName",
        totalProjects: {
          $size: "$totalProjects",
        },
        totalSections: {
          $size: "$totalSections",
        },
        totalTasks: 1,
        completedTasks: 1,
        pendingTasks: 1,
        dueTasks: 1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: tasks,
  });
});
