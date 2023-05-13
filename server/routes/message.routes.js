const express = require("express");
const { protectAuth } = require("../middlewares/protectAuth.MW");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messages.controller");

const router = express.Router();

router.route("/:chatId").get(protectAuth, allMessages);
router.route("/").post(protectAuth, sendMessage);

module.exports = router;
