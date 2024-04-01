const User = require("../models/EmpDetails");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const { sendTokensAndCookies } = require("./helperFunction");
const Notes=require("../models/Notes");


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
  // const newNotes=new Notes({
  //   userId:"62a9a93ad7754d3a216211e2",
  //   heading:"abc",
  //   msg:"message"
  // })
  // await newNotes.save()
  sendTokensAndCookies(req, res, user, 200);
});

//* Get user *********************************************************

exports.getUser = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "SUCCESS",
    data: {
      user: user,
    },
  });
});
