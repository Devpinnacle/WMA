// sockets/userSocket.js

module.exports = {
  initialize: (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });

      socket.on('login',(data)=>{
        console.log(`User ${data.userId} logged in`);
        io.emit('adminNotification','user logged in')
      })
    });
  },
};
