const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");

//auth middleware
const auth = require("../middlewares/auth");

/*  @route GET /chat
    @desc Get all conversations of logged in user
    @access Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user.id });
    res.send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /chat/:chat_id
    @desc Get all messages of a chat_id
    @access Private
*/
router.get("/:chat_id", auth, async (req, res) => {
  try {
    //get that chat
    const chat = await Chat.findById(req.params.chat_id);

    //if there's no chat throw error
    if (!chat) {
      return res
        .status(404)
        .send({ errors: [{ msg: "No conversation found!" }] });
    }

    //if there is a chat check if the req.user is NOT part of it
    if (!chat.users.includes(req.user.id)) {
      return res.status(403).send({ errors: [{ msg: "Unauthorized" }] });
    }

    //if the user is part of it then find all the messages of that chat conversation and return them back
    const messages = await Message.find({
      chatId: req.params.chat_id,
    }).sort({ date: -1 });
    // .populate("receiver");

    res.send(messages);
  } catch (error) {
    console.error(error);
    res.send("Server error");
  }
});

/*  @route GET /chat
    @desc Check if a conversation exists between two users
    @access Private
*/
// router.get("/check/:recipient", auth, async (req, res) => {
//   try {
//     const users = [req.user.id, req.params.recipient];

//     const chat = await Chat.findOne({ users });

//     if (!chat) {
//       return res.send(false);
//     }

//     res.send(chat);
//   } catch (error) {
//     console.error(error);
//     res.send(error);
//   }
// });

module.exports = router;
