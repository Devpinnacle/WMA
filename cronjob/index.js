const cron = require("node-cron");
const DailyReport = require("./model/DailyReport");
const Task = require("./model/Tasks");
const Section = require("./model/Sections");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wma").then(async (conn) => {
  console.log(`MongoDB connected Socket: ${"mongodb://localhost:27017/wma"}`);
});

async function updateDailyReport() {
  try {
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateString = yesterday.toISOString().split("T")[0];

    console.log("yesterday", yesterday);
    console.log("new Date()", new Date());

    // Fetch tasks that are in progress or were completed yesterday
    const tasks = await Task.find({
      $and: [
        {
          $or: [
            { status: "In Progress" },
            { completedDate: { $gte: yesterday, $lt: new Date() } },
          ],
        },
        {
          deletedStatus: false,
        },
      ],
    });

    // Construct daily report for each task
    for (const task of tasks) {
      const dailyReport = new DailyReport({
        userId: task.assignedTo,
        projectId: task.projectId,
        sectionId: task.sectionId,
        taskId: task._id,
        stages: task.stage,
        duration: task.duration,
        status: task.status,
        progress: task.progress,
        notes: task.notes,
      });
      await dailyReport.save();
    }

    for (const task of tasks) {
      task.totalDuration += task.duration;
      task.duration = 0;
      await task.save();
    }

    console.log("Daily report generated successfully.");
  } catch (error) {
    console.log("Error generating daily report:", error);
  }
}

async function updateCompletedSections() {
  try {
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Update sections where progress is 100% and dueDate is yesterday
    await Section.updateMany(
      { progress: 100, dueDate: { $lte: yesterday } },
      { $set: { completed: true } }
    );

    console.log("Completed sections updated successfully.");
  } catch (error) {
    console.log("Error updating completed sections:", error);
  }
}

// Schedule the cron job to run at midnight
cron.schedule("46 11 * * *", async () => {
  console.log("Running daily report cron job...");
  await updateDailyReport();
  await updateCompletedSections();
});
