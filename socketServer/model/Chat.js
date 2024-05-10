const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
const EmpDetails = require("./EmpDetails"); 
const Projects=require("./sctProjects");

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
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const amPM = hours >= 12 ? "PM" : "AM";
      hours %= 12;
      hours = hours || 12; 
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

chatSchema.pre('save', async function(next) {
  try {
    const user = await EmpDetails.findById(this.userId);
    if (user) {
      this.name = user.userName;
    }
    const project=await Projects.findById(this.projectId);
    if(project){
      this.projectName=project.sctProjectName
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports=chats=mongoose.model("chats",chatSchema)
