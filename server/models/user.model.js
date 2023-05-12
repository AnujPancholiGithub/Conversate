const mongoose = require("mongoose");
const { generateHash, compareHash } = require("../config/hash.password");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      type: String,
      required: true,
      default: "https://imgpile.com/images/97tYPx.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  this.password = await generateHash(this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
