const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const sectionShema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  projectId: {
    type: ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
  },
  progress: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: ObjectId,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  editedDate: {
    type: Date,
  },
  editedBy: {
    type: ObjectId,
  },
  deletedStatus: {
    type: Boolean,
    default: false,
  },
  deletedBy: {
    type: ObjectId,
  },
  deletedDate: {
    type: Date,
  },
});

module.exports = sections = mongoose.model("sections", sectionShema);
