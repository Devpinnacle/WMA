const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
const EmpDetails = require("./EmpDetails"); 
const Projects=require("./sctProjects");
const Section=require("./Sections")

const notificationSchema = new mongoose.Schema({
  createdDate: {
    type: String,
    default: Date.now(),
  },
  time: {
    type: String,
    default: () => {
      // Function to get the current time in HH:MM AM/PM format
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const amPM = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12; // Handle midnight (0 hours)
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`;
      return formattedTime;
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
  symbol:{
    type: String,
    required: true,
  },
  empUserId:{
    type: ObjectId,
    ref: "empdetails",
    default:null
  }
});

module.exports = mongoose.model("notification", notificationSchema);
