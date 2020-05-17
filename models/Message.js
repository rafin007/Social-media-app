const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        trim: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    image: {
        type: Buffer
    },
    seen: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;