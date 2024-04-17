const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const notificationSchema = new mongoose.Schema({
  createdDate: {
    type: String,
    default: Date.now(),
  },
  time: {
    type: String,
    default: () => {
      // Function to get the current time in HH:MM format
      const currentDate = new Date();
      return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    },
  },
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "empdetails",
    required: true,
  },
  projectId: {
    type: ObjectId,
    ref: "sctproject",
    default:null
  },
  sectionId: {
    type: ObjectId,
    ref: "sections",
    default:null
  },
  priority: {
    type: String,
    required: true,
  },
});

module.exports = notification = mongoose.model(
  "notification",
  notificationSchema
);
