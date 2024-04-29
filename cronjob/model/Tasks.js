const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  priority: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: null,
  },
  completedDate: {
    type: Date,
    default: null,
  },
  duration: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  sectionId: {
    type: ObjectId,
    ref: "sections",
    required: true,
  },
  projectId: {
    type: ObjectId,
    ref: "sctproject",
    required: true,
  },
  progressUpdateDate: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: ObjectId,
    ref: "empdetails",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  assignedTo: {
    type: ObjectId,
    ref: "empdetails",
    required: true,
  },
  deletedStatus: {
    type: Boolean,
    default: false,
  },
  deletedBy: {
    type: ObjectId,
    ref: "empdetails",
    default: null,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
});

module.exports = task = mongoose.model("task", taskSchema);
