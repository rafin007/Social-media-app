const mongoose = require('mongoose');

const notificationModel = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    sender: {
        user: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        user: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});