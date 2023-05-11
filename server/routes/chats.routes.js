const express = require("express");
const { protectAuth } = require("../middlewares/protectAuth.MW");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chats.controller");

const router = express.Router();

router.post("/", protectAuth, accessChat);
router.get("/", protectAuth, fetchChats);
router.post("/groups", protectAuth, createGroupChat);
router.put("/rename", protectAuth, renameGroup);
router.put("/groups/add-user", protectAuth, addToGroup);
router.put("/groups/remove-user", protectAuth, removeFromGroup);

module.exports = router;
