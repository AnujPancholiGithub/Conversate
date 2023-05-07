const JWT = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyJwtToken = (token) => {
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = { generateJwtToken, verifyJwtToken };
