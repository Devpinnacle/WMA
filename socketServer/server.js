const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const Notification = require("./model/Notification");
const Emp=require("./model/EmpDetails")

dotenv.config();

const app = express(); 
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust for your frontend origin 
  })
);
app.options("*", cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async(conn) =>{ console.log(`MongoDB connected Socket: ${process.env.MONGO_URI}`);});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { 
    origin: "http://localhost:5173",
    credentials: true,
  },
});  

io.on("connection",async (socket) => {
  // console.log(`User connected: ${socket.id}`);

  socket.on("login", async (data) => {
    const notifications = await Notification.find({})
    .populate("userId","userName")
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName"); 
    io.sockets.emit("Notifie",notifications );
  });

  socket.on("addsection", async (data) => {
    const notifications = await Notification.find({})
    .populate("userId","userName")  
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName"); 
    io.sockets.emit("Notifie",notifications );
  });

  socket.on("deletesection", async (data) => {
    const notifications = await Notification.find({})
    .populate("userId","userName")  
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName"); 
    io.sockets.emit("Notifie",notifications );
  });

  socket.on("editsection", async (data) => {
    const notifications = await Notification.find({})
    .populate("userId","userName")  
      .populate("projectId", "sctProjectName")
      .populate("sectionId", "sectionName"); 
    io.sockets.emit("Notifie",notifications );
  });

  socket.on("disconnect", () => {
   // console.log(`User disconnected: ${socket.id}`);
    // Add your disconnect logic here
  });
});

// require("./sockets").initialize(server);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
