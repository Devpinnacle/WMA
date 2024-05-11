const catchAsync = require("../utils/catchAsync");
const Chat = require("../models/Chat");

//* get chats ******************************************************
exports.getchats = catchAsync(async (req, res, next) => {
  const chats = await Chat.aggregate([
    {
      $lookup: {
        from: "empdetails",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "sctprojects",
        localField: "projectId",
        foreignField: "_id",
        as: "project",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: { path: "$project", preserveNullAndEmptyArrays: true },
    },
    {
      $group: {
        _id: "$date",
        data: {
          $push: {
            name: "$user.userName",
            projectName: "$project.sctProjectName",
            message: "$message",
            time: "$time",
          },
        },
      },
    },
  ]);
  chats.sort((a,b)=> new Date(a._id) - new Date(b._id));

  res.status(200).json({
    status: "success",
    data: chats,
  });
  
});
