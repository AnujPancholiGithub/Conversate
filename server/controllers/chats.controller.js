const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "Please provide a userId parameter",
      data: null,
    });
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  console.log(`🚀 ~> file: chats.controller.js:25 ~> accessChat ~> ̥:`, isChat);

  res.status(200).json(isChat);
});

module.exports = {
  accessChat,
};
