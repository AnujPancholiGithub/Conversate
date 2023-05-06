const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: { type: String, required: 
        true, trim: true },
    email: { type:     String, required: true, unique: true },
    password: { type: String, required: true,},
    profile : { type: String, required: true, default: "https://imgpile.com/images/97tYPx.png" },
}, {timestamps: true});


const User = mongoose.model("User", userSchema);

module.exports = User;