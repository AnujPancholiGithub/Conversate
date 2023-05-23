const asyncHandeler = require("express-async-handler");
const User = require("../models/user.model");
const { generateJwtToken } = require("../config/jwt.token");
const { compareHash } = require("../config/hash.password");

const registerUser = asyncHandeler(async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({
      serverMessage:
        "We kindly request that you provide us with all the required details",
    });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(409).json({
      serverMessage:
        "Oops! déjà vu? Looks like you've already got an account - log in and let's get going!",
    });
  }

  const user = await User.create({ name, email, password, image });

  const payload = {
    name: user.name,
    email: user.email,
    profile: user.image,
    _id: user.id,
  };

  if (user) {
    res.status(200).json({
      payload,
      token: generateJwtToken(payload),
    });
  } else {
    res.status(401).json({
      serverMessage:
        "Uh oh, looks like something went wrong with account creation",
    });
  }
});

const logIN = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Invalid Filed data");
    return res.status(401).send("Invalid user data");
  }

  const userExist = await User.findOne({ email });

  const decoded = await compareHash(userExist.password, password);

  console.log("userExist, ", userExist.password);

  if (userExist && decoded) {
    const payload = {
      name: userExist.name,
      email: userExist.email,
      profile: userExist.image,
      _id: userExist.id,
    };
    return res.status(200).json({
      payload,
      token: generateJwtToken(payload),
      serverMessage: "Welcome back! Login successful.",
    });
  } else {
    res
      .status(401)
      .send(
        "Oops! Looks like there's an issue with your login details. Let's give it another shot"
      );
  }
});

module.exports = { registerUser, logIN };
