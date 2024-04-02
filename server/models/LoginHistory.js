const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const LoginHistorySchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  loginDate: {
    type: String,
    required: true,
  },
  loginDateTime: {
    type: Date,
    default: Date.now(),
  },
  ipAddress: {
    type: String,
  },
});

module.exports = loginhistories = mongoose.model(
  "loginhistories",
  LoginHistorySchema
);