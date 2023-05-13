const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(401).json({
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

  if (isChat.length > 0) {
    return res.status(200).send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userID],
    };

    try {
      const newChat = await Chat.create(chatData);
      isChat = await Chat.findOne({ _id: newChat._id });
      res.status(200).send(isChat);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    var allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    allChats = await User.populate(allChats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).send(allChats);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.groupName) {
    return res.status(401).send("Please Fill all details");
  }

  var users = JSON.parse(req.body.users);

  users.push(req.user._id);

  if (users.length < 2) {
    return res
      .status(400)
      .send("For creating a group we need minimum 2 users.");
  }

  const groupChatData = {
    chatName: req.body.groupName,
    isGroupChat: true,
    users: users,
    groupAdmin: req.user,
  };

  try {
    const newGroup = await Chat.create(groupChatData);

    const populatedGroupChat = await Chat.findOne({ _id: newGroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).send(populatedGroupChat);
  } catch (error) {
    return res
      .status(400)
      .send("Something went wrong with group creation : ", error);
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { groupID, newName } = req.body;

  if (!groupID || !newName) {
    return res.status(401).send("Please Provide All details");
  }

  try {
    const groupUpdated = await Chat.findByIdAndUpdate(
      groupID,
      { chatName: newName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).send(groupUpdated);
  } catch (error) {
    return res.status(401).send(`Error during renaming of group: ${error}`);
  }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
  const { groupID, newUserID } = req.body;

  if (!newUserID) {
    return res.status(400).send("Please Give a user to add in group");
  }

  try {
    const groupUpdated = await Chat.findByIdAndUpdate(groupID, {
      $push: { users: newUserID },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).send(groupUpdated);
  } catch (error) {
    return res
      .status(400)
      .send(`Error while adding a new user to group ${error}`);
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { groupID, newUserID } = req.body;

  if (!newUserID) {
    return res.status(400).send("Please Give a user to add in group");
  }

  try {
    const groupUpdated = await Chat.findByIdAndUpdate(groupID, {
      $pull: { users: newUserID },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).send(groupUpdated);
  } catch (error) {
    return res
      .status(400)
      .send(`Error while removing a new user to group ${error}`);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
