const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const UserGroupSchema = new mongoose.Schema({
  userGroupName: {
    type: String,
    required: true,
  },
  userGroupEnteredById: {
    type: ObjectId,
  },
  userGroupDateTime: {
    type: Date,
    default: Date.now(),
  },
  userGroupEditedById: {
    type: ObjectId,
  },
  userGroupEditedDateTime: {
    type: Date,
  },
});

module.exports = usergroup = mongoose.model("usergroup", UserGroupSchema);
