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
    type: Date,
    default: new Date(),
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
});
