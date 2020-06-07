const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // company: {
    //     type: String
    // },
    website: {
        type: String
    },
    address: {
        type: String
    },
    profession: {
        type: String,
        // required: true
    },
    // skills: {
    //     type: [String],
    //     required: true
    // },
    bio: {
        type: String
    },
    birthday: {
        type: String
    },
    // githubusername: {
    //     type: String
    // },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            // location: {
            //     type: String
            // },
            // from: {
            //     type: Date,
            //     required: true
            // },
            // to: {
            //     type: Date
            // },
            // current: {
            //     type: Boolean,
            //     default: false
            // },
            // description: {
            //     type: String
            // }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            // field: {
            //     type: String,
            //     required: true
            // },
            // from: {
            //     type: Date,
            //     required: true
            // },
            // to: {
            //     type: Date
            // },
            // current: {
            //     type: Boolean,
            //     default: false
            // },
            // description: {
            //     type: String
            // }
        }
    ],
    social: [
        {
            name: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;