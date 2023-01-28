const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const msgRoutes = require('./routes/messages');

require("dotenv").config();

const app = express()

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((client) => {
    console.log("Database Connected Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/messages', msgRoutes)

const server = app.listen(process.env.PORT, ()=>{
    console.log(`[STARTING] Server starting at port: ${process.env.PORT}`);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log(userId)
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});