const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const SctProjectSchema = new mongoose.Schema({
  sctProjectName: {
    type: String,
    //required: true,
  },
  sctProjectDesc: {
    type: String,
  },
  sctProjectEnteredById: {
    type: ObjectId,
    ref: "empdetails",
  },
  sctProjectDate: {
    type: String,
  },
  agreementTemplate: {},
  sctProjectEditedById: {
    type: ObjectId,
    default:null
  },
  sctProjectEditedDateTime: {
    type: String,
    default:null
  },
  tags:{
    type:[String],
  },
});

module.exports = sctproject = mongoose.model("sctproject", SctProjectSchema);
