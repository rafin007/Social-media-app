const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "chat",
  },
  text: {
    type: String,
    trim: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  seen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
