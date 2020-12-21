const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  date: {
    type: Date,
  },
});

chatSchema.virtual("msgs", {
  ref: "message",
  localField: "_id",
  foreignField: "chatId",
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
