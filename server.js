const connectDB = require("./DB/db");
const express = require("./config/express");
const jwt = require("jsonwebtoken");
const config = require("config");

//socket.io
const app = express.init();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// io.of("/socket").on("connection", (socket) => {
//   console.log("Socket.io - User connected: ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Socket.io - User disconnected: ", socket.id);
//   });
// });

//conncect to database
connectDB(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//check token via socket.io
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, config.get("jwtSecret"));
    socket.userId = payload.user.id;
    next();
  } catch (error) {
    console.error(error);
  }
});

io.on("connection", (socket) => {
  console.log("Connected: ", socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.userId);
  });
});
