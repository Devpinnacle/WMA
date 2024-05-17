const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const chatSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "empdetails",
    required: true,
  },
  message: {
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
      return `${year}-${month}-${day}`.toString();
    },
  },
  time: {
    type: String,
    default: () => {
      // Function to get the current time in HH:MM AM/PM format
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const amPM = hours >= 12 ? "PM" : "AM";
      hours %= 12;
      hours = hours || 12; // Handle midnight (0 hours)
      const formattedTime = `${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${amPM}`;
      return formattedTime;
    },
  },
  projectId: {
    type: ObjectId,
    ref: "sctproject",
    default:null
  },
});

module.exports=chats=mongoose.model("softwarechats",chatSchema)
