const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");

//Genrate a Hashed Password With salt round 5 (For optimize results);

const generateHash = expressAsyncHandler(async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, 5);
  console.log("hash: ", hash);
  return hash;
});

const compareHash = expressAsyncHandler(
  async (hashedPassword, plainPassword) => {
    const decoded = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("decoded: ", decoded);
    return decoded;
  }
);

module.exports = { generateHash, compareHash };
