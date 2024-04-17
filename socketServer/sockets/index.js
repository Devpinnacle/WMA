const userSocket = require("./userSocket");

module.exports = {
  initialize: (server) => {
    userSocket.initialize(server);
  },
};
