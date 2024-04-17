const catchAsync = require("../utils/catchAsync");
const LoginHistory=require("../models/LoginHistory");
const { createTokensAndCookies } = require("../utils/tokensAndCookies");

//* Create and send tokens *****************************************

exports.sendTokensAndCookies = async (req, res, user, statusCode) => {

  const { accessToken } = await createTokensAndCookies(
    user,
    res
  );

  res.status(statusCode).json({
    status: "SUCCESS",
    accessToken,
    userId:user._id,
  });
};

//* Save Login history  ********************************************

exports.saveLoginHistory=catchAsync(async(user,ipAddress)=>{
  const newLoginHistory=new LoginHistory({
    userId: user._id,
    loginDate: new Date().toLocaleDateString(),
    ipAddress: ipAddress,
  });
  await newLoginHistory.save();
})

//* date ***************************************************************

exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

exports.dashedFormatDate = (dateString,minus) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  console.log("day",day-minus)
  console.log("day actual",day)
  return `${year}-${month}-${day-minus}`.toString();
}