const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notes = require("../models/Notes");

//* Get notes ***********************************************************

exports.getNotes = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const notes = await Notes.find({ userId, deleted_status: false });
  res.status(200).json({ data: notes });
});

//* Save notes ***********************************************************

exports.saveNotes = catchAsync(async (req, res,next) => {
  const userId = req.user._id;

  const { head, msg } = req.body;
  if (!head || !msg) {
    return next(new AppError("Please provide both header and message.", 400));
  }

  const newNotes = new Notes({
    userId: userId,
    heading: head,
    msg: msg,
  });
  await newNotes.save();

  const notes = await Notes.find({ userId, deleted_status: false });
  res.status(200).json({ data: notes });
});

//* Delete notes ***********************************************************

exports.deleteNotes = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.body;
  if (!id) {
    return next(new AppError("Please provide both header and message.", 400));
  }

  await Notes.updateOne(
    { _id: id },
    { $set: { deleted_status: true } }
  );

  const notes = await Notes.find({ userId, deleted_status: false });
  res.status(200).json({ data: notes });
});
