const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
const EmpDetails = require("./EmpDetails"); 

const taskNotificationSchema=new mongoose.Schema({
    taskId:{
        type:ObjectId,
        required:true,
    },
    action:{
        type:String,
        required:true,
    },
    userId:{
        type: ObjectId,
        ref: "empdetails",
        required: true,
    },
    newData:{
        type:String,
        default:null
    }
})

module.exports = taskNotification = mongoose.model("taskNotification", taskNotificationSchema);