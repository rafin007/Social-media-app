const connectDB = require("./DB/db");
const express = require("./config/express");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
// const jwt = require("jsonwebtoken");
// const config = require("config");

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
connectDB();

io.on("connection", (socket) => {
  socket.on("initiateConversation", ({ sender, receiver }) => {
    console.log("sender: ", sender);
    console.log("receiver: ", receiver);
  });

  socket.on("sendMessage", async ({ sender, receiver, text, date }) => {
    // console.log("sender: ", sender);
    // console.log("receiver: ", receiver);
    // console.log("text", text);
    // console.log("date", date);

    //save in database
    try {
      const users = [sender, receiver];
      //check if a chat exists between the users
      const chat = await Chat.findOne({
        $and: [{ users: { $all: users } }, { users: { $size: 2 } }], //checks if the array matches regardless of order
      });
      //if exists find that chatId and create new message with that chatId
      if (chat) {
        const message = new Message({
          chatId: chat.id,
          sender,
          receiver,
          text,
          date,
        });

        await message.save();
      }
      //else create a new chat with the users and create new message
      else {
        const chat = new Chat({ users });
        await chat.save();

        const message = new Message({
          chatId: chat.id,
          sender,
          receiver,
          text,
          date,
        });
        await message.save();
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//check token via socket.io
// io.use(async (socket, next) => {
//   try {
//     const token = socket.handshake.query.token;
//     const payload = jwt.verify(token, config.get("jwtSecret"));
//     socket.userId = payload.user.id;
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// });

// io.on("connection", (socket) => {
//   console.log("Connected: ", socket.userId);

//   socket.on("disconnect", () => {
//     console.log("Disconnected: ", socket.userId);
//   });
// });
