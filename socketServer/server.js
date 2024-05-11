const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const Notification = require("./model/Notification");
const TaskNotification = require("./model/TaskNotification");
const Chat=require('./model/Chat')
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.6.66:5173",
      "http://192.168.6.65:5173",
      "http://192.168.6.189:5173",
    ],
  })
);
app.options("*", cors());

mongoose.connect(process.env.MONGO_URI).then(async (conn) => {
  console.log(`MongoDB connected Socket: ${process.env.MONGO_URI}`);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.6.66:5173",
      "http://192.168.6.65:5173",
      "http://192.168.6.189:5173",
    ],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  // console.log(`User connected: ${socket.id}`);
  socket.on("join", (userId) => {
    socket.join(userId); // Join a room identified by user ID
  });

  socket.on("login", async (data) => {
    const notifications = await Notification.find({})
      .populate("userId", "userName")
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName");
    io.sockets.emit("Notifie", notifications);
  });

  socket.on("updateNotification", async (data) => {
    const notifications = await Notification.find({})
      .populate("userId", "userName")
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName");
    io.sockets.emit("Notifie", notifications);
  });

  socket.on("taskNotification", async (taskId) => {
    const taskNotification = await TaskNotification.find({
      taskId: taskId,
    }).populate("userId", "userName");
    io.sockets.emit("taskNotifications", taskNotification);
  });

  socket.on("userNotification", async (Id) => {
    console.log("user Notifications");
    const notifications = await Notification.find({ empUserId: Id })
      .populate("userId", "userName")
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName")
      .populate("empUserId", "userName");
    // console.log("user Notifications", notifications);
    io.to(Id).emit("userNotification", notifications);  
  });

  socket.on("updateTaskNotification", async (assign) => {
    console.log("update task Notifications");
    assign.map(async (Id) => {
      const notifications = await Notification.find({ empUserId: Id })
        .populate("userId", "userName")
        .populate("projectId", "sctProjectName")
        .populate("sectionId", "sectionName")
        .populate("empUserId", "userName");
      io.sockets.to(Id).emit("userNotification", notifications);
    });
  });

  socket.on("chats",async(data)=>{
    const newChat=new Chat({
      userId:data.userId,
      message:data.message,
      projectId:data.projectId?data.projectId:null,
    })
    await newChat.save()
    const chats = await Chat.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "sctprojects",
          localField: "projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $unwind: { path: "$project", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$date",
          data: {
            $push: {
              name: "$user.userName",
              projectName: "$project.sctProjectName",
              message: "$message",
              time: "$time",
            },
          },
        },
      },
    ]);
    chats.sort((a,b)=> new Date(a._id) - new Date(b._id));
    io.sockets.emit("chats", chats);
  })

  socket.on("disconnect", () => {
    
  });
});

// require("./sockets").initialize(server);

const PORT = 3001;
const IP='192.168.6.65'

server.listen(PORT,IP, () => {
  console.log(`Server is running on port ${PORT}`);
});
