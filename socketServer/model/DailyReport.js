const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const dailyReportSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  projectId: {
    type: ObjectId,
    required: true,
  },
  sectionId: {
    type: ObjectId,
    required: true,
  },
  taskId: {
    type: ObjectId,
    required: true,
  },
  stages: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}-${month}-${year}`.toString();
    },
  },
});

module.exports = dailyreport = mongoose.model("dailyreport", dailyReportSchema);
