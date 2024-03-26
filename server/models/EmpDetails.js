const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const EmpDetailsSchema = new mongoose.Schema({
  empFullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilephoto: {
    type: String,
  },
  empCode: {
    type: String,
  },
  departmentId: {
    type: ObjectId,
  },
  departmentName: {
    type: String,
  },
  designationId: {
    type: ObjectId,
  },
  designationName: {
    type: String,
  },
  empDesignationDate: {
    type: String,
  },
  empJoiningDate: {
    type: String,
  },
  empDOB: {
    type: String,
  },
  empAadharNo: {
    type: String,
  },
  empPanNo: {
    type: String,
  },
  empPhone: {
    type: Number,
  },
  empEmail: {
    type: String,
  },
  empAddress: {
    type: String,
  },
  empState: {
    type: String,
  },
  empPincode: {
    type: Number,
  },
  usergroupsId: {
    type: ObjectId,
  },
  userGroupName: {
    type: String,
  },
  empStatus: {
    type: String,
    default: "Active",
  },
  empColorCode: {
    type: String,
  },
  empCtAccess: {
    type: String,
    default: "None",
  },
  empEnteredById: {
    type: ObjectId,
  },
  empEditedById: {
    type: ObjectId,
  },
  empDateTime: {
    type: Date,
    default: Date.now(),
  },
  empEditedDateTime: {
    type: Date,
  },
  empDeactiveReason: {
    type: String,
  },
  empDeactiveById: {
    type: ObjectId,
  },
  empDeactiveDateTime: {
    type: Date,
  },
  empBankName: {
    type: String,
  },
  empAccountNo: {
    type: String,
  },
  empBankBranch: {
    type: String,
  },
  empIFSCCode: {
    type: String,
  },
  empPFNo: {
    type: String,
  },
  empPFDate: {
    type: String,
  },
  empUANNo: {
    type: Number,
  },
  empESICNo: {
    type: Number,
  },
  empBasic: {
    type: SchemaTypes.Double,
  },
  empHRA: {
    type: SchemaTypes.Double,
  },
  empCA: {
    type: SchemaTypes.Double,
  },
  empDA: {
    type: SchemaTypes.Double,
  },
  proinc: {
    type: SchemaTypes.Double,
  },
  cityallowance: {
    type: SchemaTypes.Double,
  },
  Others: {
    type: SchemaTypes.Double,
  },
  empLoginStatus: {
    type: Number,
  },
});

module.exports = empdetails = mongoose.model("empdetails", EmpDetailsSchema);
