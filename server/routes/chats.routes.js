const express = require("express");
const { protectAuth } = require("../middlewares/protectAuth.MW");
const { accessChat } = require("../controllers/chats.controller");

const router = express.Router();

router.post("/", protectAuth, accessChat);
// router.get("/", protectAuth, fetchChats);
// router.post("/groups", protectAuth, createGroupChat);
// router.put("/rename", protectAuth, renameGroup);
// router.get("/reomve-group", protectAuth, removeFromGroupChat);
// router.get("/add-group", protectAuth, addToGroup);

module.exports = router;
