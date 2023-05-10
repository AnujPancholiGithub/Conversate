const express = require("express");
const { registerUser, logIN } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", logIN);

module.exports = router;
