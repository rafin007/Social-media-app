const connectDB = require("./DB/db");
const express = require("./config/express");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const mongoose = require("mongoose");
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
connectDB();

//socket.io
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
  socket.on("initiateConversation", ({ receiver }) => {
    console.log("sender: ", socket.userId);
    console.log("receiver: ", receiver);
  });

  socket.on("sendMessage", async ({ receiver, text, date }) => {
    // console.log("sender: ", sender);
    // console.log("receiver: ", receiver);
    // console.log("text", text);
    // console.log("date", date);

    //join them in an unique room
    // socket.join(`${socket.userId} ${receiver}`);
    //save in database
    try {
      const users = [socket.userId, receiver];
      //check if a chat exists between the users
      const chat = await Chat.findOne({
        $and: [{ users: { $all: users } }, { users: { $size: 2 } }], //checks if the array matches regardless of order
      });
      //if exists find that chatId and create new message with that chatId
      if (chat) {
        //save the last message date into chat
        chat.date = date;
        await chat.save();

        const message = new Message({
          chatId: chat.id,
          sender: socket.userId,
          receiver,
          text,
          date,
        });

        await message.save();
        io.emit("newMessage", message);
      }
      //else create a new chat with the users and create new message
      else {
        //save the last message date into chat
        const chat = new Chat({ users, date });

        await chat.save();

        const message = new Message({
          chatId: chat.id,
          sender: socket.userId,
          receiver,
          text,
          date,
        });
        await message.save();
        io.emit("newMessage", message);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("real time open");

//   const messageChangeStream = connection.collection("messages").watch();

//   messageChangeStream.on("change", (change) => {
//     switch (change.operationType) {
//       case "insert": {
//         console.log("new message");
//         const message = {
//           _id: change.fullDocument._id,
//           sender: change.fullDocument.sender,
//           receiver: change.fullDocument.receiver,
//           chatId: change.fullDocument.chatId,
//           date: change.fullDocument.date,
//           text: change.fullDocument.text,
//         };
//         io.to(message.receiver).emit("newMessage", message);
//         break;
//       }
//     }
//   });
// });

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
