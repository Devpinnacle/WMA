const catchAsync = require("../utils/catchAsync");
const LoginHistory = require("../models/LoginHistory");
const AppError = require("../utils/appError");
const Notification = require("../models/Notification");
const { createTokensAndCookies } = require("../utils/tokensAndCookies");
const TaskNotification = require("../models/taskNotifications");
const User = require("../models/EmpDetails");

//* Create and send tokens *****************************************

exports.sendTokensAndCookies = async (req, res, user, statusCode) => {
  const refreshToken = req.cookies?.refresh || req.headers.refreshtoken;
  if (refreshToken) {
    // If any cookie => remove it from DB
    user.refreshTokens = user.refreshTokens.filter(
      (rt) => rt.token !== refreshToken
    );

    // Reuse detection
    const foundToken = await User.findOne({
      "refreshTokens.token": refreshToken,
    });
    if (!foundToken) user.refreshTokens = [];
  }

  const { accessToken, refreshToken: rT } = await createTokensAndCookies(
    user,
    res
  );

  res.status(statusCode).json({
    status: "SUCCESS",
    accessToken,
    userId: user._id,
    refreshToken: rT
  });
};

//* Save Login history  ********************************************

exports.saveLoginHistory = catchAsync(async (user, ipAddress) => {
  const newLoginHistory = new LoginHistory({
    userId: user._id,
    loginDate: new Date().toLocaleDateString(),
    ipAddress: ipAddress,
  });
  await newLoginHistory.save();
});

//* date ***************************************************************

exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

exports.dashedFormatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`.toString();
};

//* add Notifications *************************************************

exports.addNotification = async (
  userId,
  projectId,
  sectionId,
  priority,
  symbol,
  action,
  res,
  next,
  empUserId = null
) => {
  if (!projectId) {
    next(new AppError("please provide project id and section id", 401));
  }
  const newNotification = new Notification({
    action: action,
    userId: userId,
    priority: priority,
    symbol: symbol,
    projectId: projectId,
    sectionId: sectionId,
    empUserId: empUserId,
  });
  await newNotification.save();

  res.status(200).json({
    status: "success",
    data: empUserId,
  });
};

//* add Notifications *************************************************

exports.addTaskNotification = async (
  userId,
  taskId,
  action,
  newData,
  res,
  next
) => {
  if (!taskId) {
    return next(new AppError("Invalid Credentials!", 401));
  }
  const newTaskNotification = new TaskNotification({
    taskId: taskId,
    action: action,
    userId: userId,
    newData: newData ? newData : null,
  });

  await newTaskNotification.save();

  res.status(200).json({
    status: "success",
    data: taskId,
  });
};

//* Delete expired refresh tokens **********************************

exports.deleteExpiredTokens = async (user) => {
  user.refreshTokens = user.refreshTokens.filter(
    (rt) => rt.expiresIn.getTime() > Date.now()
  );
};
