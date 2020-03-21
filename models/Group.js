const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    users: [
        {
            user: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    posts: [
        {
            post: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;