const express = require("express");
const { allUsers } = require("../controllers/users.controller");
const { protectAuth } = require("../middlewares/protectAuth.MW");

const router = express.Router();

router.get("/", protectAuth, allUsers);

module.exports = router;
