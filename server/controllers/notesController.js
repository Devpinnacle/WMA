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

exports.saveNotes = catchAsync(async (req, res, next) => {
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

  res.status(200).json({ data: "succsess" });
});

//* Delete notes ***********************************************************

exports.deleteNotes = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return next(new AppError("Please provide Note id.", 400));
  }

  await Notes.updateOne({ _id: id }, { $set: { deleted_status: true } });

  res.status(200).json({ data: "succsess" });
});

//* Update Notes ***********************************************************

exports.updateNotes=catchAsync(async(req,res,next)=>{
  const id=req.body.Id;
  if (!id) {
    return next(new AppError("Please provide Note id.", 400));
  }
  await Notes.updateOne({ _id: id }, { $set: { msg: req.body.msg } });
  res.status(200).json({ data: "succsess" });
})