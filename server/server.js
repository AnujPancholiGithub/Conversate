const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoConnect = require("./config/db");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
const chatRoutes = require("./routes/chats.routes");
const messageRoutes = require("./routes/message.routes");
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

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
// app.use("/:random", errorHandeler);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server Started on PORT: ", PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (Socket) => {
  console.log("connected to socket.io");

  Socket.on("setup", (userData) => {
    Socket.join(userData._id);
    Socket.emit("connected");
  });

  Socket.on("join chat", (room) => {
    Socket.join(room._id);
    console.log("User Joined room", room._id);
  });

  Socket.on("typingGoingOn", (room) => {
    console.log("typing going on");
    return Socket.in(room).emit("typingGoingOn");
  });
  Socket.on("typingShouldOff", (room) => {
    console.log("typiNG offffffff");
    return Socket.in(room).emit("typingShouldOff");
  });

  Socket.on("new message", (newMessageRecieved) => {
    console.log("Message Recevied: ", newMessageRecieved);
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not exist");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      Socket.in(user._id).emit("message recieved", newMessageRecieved);
      console.log("Message Sent: ");
    });
  });
});
