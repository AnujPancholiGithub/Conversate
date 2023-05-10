const expressAsyncHandler = require("express-async-handler");
const { verifyJwtToken } = require("../config/jwt.token");

const protectAuth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const payload = await verifyJwtToken(token);
      console.log("verifyJwtToken : ", payload);
      req.user = payload;
      next();
    } catch (error) {
      console.log("error: ", error);
      res.status(401).send("Auth Not Procces Because Of Bad Token");
    }
  }
});

module.exports = { protectAuth };
