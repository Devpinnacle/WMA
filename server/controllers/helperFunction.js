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