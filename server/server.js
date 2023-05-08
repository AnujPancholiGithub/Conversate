const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const errorHandeler = require("./middlewares/requestErrorHandeler.MW");
//Connecting MongoDB
mongoConnect();
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ram ram ji first request on this web app");
});

app.use("/api/auth", userRouter);
// app.use("/:random", errorHandeler);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port: ", port);
});
