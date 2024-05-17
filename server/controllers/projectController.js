const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project = require("../models/sctProjects");
const Task = require("../models/Tasks");
const Section = require("../models/Sections");

//* Get Projects ***********************************************************

exports.getProjects = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const group = req.user.softDesig;

  const projects = await Project.find(
    {},
    { tags: 1, sctProjectName: 1, sctProjectEnteredById: 1 }
  ).populate("sctProjectEnteredById", "userName");

  if (group === "Software") {
    const updatedProjects = await Promise.all(
      projects.map(async (project) => {
        const userTasks = await Task.find({
          projectId: project._id,
          assignedTo: userId,
          deletedStatus: false,
        });

        const assigned = userTasks.length;

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
          return new Date().setHours(0,0,0,0)> new Date(task.dueDate).setHours(0,0,0,0) && task.status !== "Completed";
        }).length;

        const updatedProject = {
          _id: project._id,
          sctProjectName: project.sctProjectName,
          tags:project.tags,
          pendingTasks,
          inProgressTasks,
          assigned,
          completedTasks,
          overdueTasks,
        };
        return updatedProject;
      })
    );
    res.status(200).json({
      status: "success",
      data: updatedProjects,
    });
  } else {
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
          return new Date().setHours(0,0,0,0)> new Date(task.dueDate).setHours(0,0,0,0) && task.status !== "Completed";
        }).length;

        const updatedProject = {
          _id: project._id,
          sctProjectName:project.sctProjectName,
          sctProjectEnteredById:project.sctProjectEnteredById,
          tags:project.tags,
          pendingTasks,
          inProgressTasks,
          assigned,
          completedTasks,
          overdueTasks,
          sectionLen
        };
        return updatedProject;
      })
    );
    res.status(200).json({
        status: "success",
        data: updatedProjects,
      });
  }
});

//* Add Projects ***********************************************************

exports.addProject=catchAsync(async(req,res,next)=>{
  const userId = req.user._id;
  const {projectName,description,tags}=req.body;

  if(!projectName||!description||!tags){
    return next(new AppError("Enter all the Fields", 401));
  }

  const newProject=new Project({
    sctProjectName:projectName,
    sctProjectDesc:description,
    sctProjectEnteredById:userId,
    sctProjectDate:Date.now().toLocaleString(),
    tags:tags
  })
  await newProject.save();

  res.status(200).json({ data: "success" });
})