const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project = require("../models/sctProjects");
const Task = require("../models/Tasks");
const Section = require("../models/Sections");
const Daily = require("../models/DailyReport");

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

  console.log(groupedData)

  res.status(200).json({
    status: "success",
    data: groupedData,
  });
});

