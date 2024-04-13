const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const sectionSchema = new mongoose.Schema({
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
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  totalTask: {
    type: Number,
    default: 0,
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
  editedDate: {
    type: Date,
    default:null
  },
  editedBy: {
    type: ObjectId,
    ref: "empdetails",
    default:null
  },
  deletedStatus: {
    type: Boolean,
    default: false,
  },
  deletedBy: {
    type: ObjectId,
    ref: "empdetails",
    default:null
  },
  deletedDate: {
    type: Date,
    default:null
  },
  completed:{
    type:Boolean,
    default:false
  }
});

module.exports = sections = mongoose.model("sections", sectionSchema);
