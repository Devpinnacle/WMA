const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const NotesSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  deleted_status:{
    type:Boolean,
    default:false,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = notes = mongoose.model(
  "notes",
  NotesSchema
);