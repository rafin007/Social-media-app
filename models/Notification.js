const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    sender: {
        user: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;