const User = require("../models/EmpDetails");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const factory=require("./handleFactory")
const { sendTokensAndCookies, saveLoginHistory, deleteExpiredTokens } = require("./helperFunction");
const { removeCookies } = require("../utils/tokensAndCookies");

//* Helping Middlewares ********************************************

// add user id in params
exports.getUserId = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

//* Log in ***********************************************************

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(
      new AppError("Please provide both userName and password.", 400)
    );
  }

  const user = await User.findOne({ userName, empStatus: "Active" });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid Credentials!", 401));
  }
  saveLoginHistory(user, req.ip);
  deleteExpiredTokens(user);
  sendTokensAndCookies(req, res, user, 200);
});

//* Get user *********************************************************

// exports.getUser = catchAsync(async (req, res) => {
//   const user = req.user;
//   res.status(200).json({
//     status: "SUCCESS",
//     data: {
//       user: user,
//     },
//   });
// });

//* Get Software user *********************************************************

exports.getSwUsers = catchAsync(async (req, res, next) => {
  const users =  await User.find({ empStatus: "Active", softDesig: "members" },{userName:1});
  res.status(200).json({
    status: "SUCCESS",
    data: users,
  });
});

//* Log out ********************************************************

exports.logout = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.refresh || req.headers.refreshtoken;
  if (refreshToken) {
    const user = await User.findOne({
      "refreshTokens.token": refreshToken,
    });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (rt) => rt.token !== refreshToken
      );
      await user.save();
    }
  }

  removeCookies(res);
  res.status(200).json({ status: "SUCCESS" });
});

//* Using Factory Handler ******************************************

exports.getUserById=factory.getById(User);

