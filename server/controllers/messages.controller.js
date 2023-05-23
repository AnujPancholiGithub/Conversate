const asyncHandler = require("express-async-handler");
const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");

//@description     Get all Messages
//@route           GET /api/Message/:chatID
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  console.log("chatID: ", req.params.chatID);
  try {
    const messages = await Message.find({ chat: req.params.chatID })
      .populate("sender", "name profile email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatID } = req.body;

  if (!content || !chatID) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatID,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatID, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
