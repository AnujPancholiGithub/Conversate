const expressAsyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyJwtToken = expressAsyncHandler(async (token) => {
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
});

module.exports = { generateJwtToken, verifyJwtToken };
