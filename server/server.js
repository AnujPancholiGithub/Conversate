const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const errorHandeler = require("./middlewares/requestErrorHandeler.MW");
//Connecting MongoDB
mongoConnect();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Ram ram ji first request on this web app");
});

app.use("/api/auth", userRouter);
app.use("/:random", errorHandeler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port: ", port);
});
