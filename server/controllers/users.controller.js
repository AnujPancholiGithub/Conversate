const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const allUsers = expressAsyncHandler(async (req, res) => {
  const searchQuery = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
            email: { $regex: req.query.search, $options: "i" },
          },
          { name: { $regex: new RegExp(req.query.search, "i") } },
        ],
      }
    : {};

  try {
    console.error("searchQuery", req.query.search);
    const users = await User.find(searchQuery)
      .find({
        _id: { $ne: req.user._id },
      })
      .select("-password")
      .sort({ name: 1 });
    console.error("users", users);
    res.send(users);
  } catch (error) {
    console.error("error", error);
  }
});

module.exports = { allUsers };
