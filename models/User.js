const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: Buffer
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  followRequests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  verified: {
    type: Boolean,
    default: false
  },
  randomString: {
    type: String
  }
});

userSchema.methods.encryptPassword = async function (password) {
  const user = this;

  //generate salt
  const salt = await bcryptjs.genSalt(10);

  //hash password
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}

const User = mongoose.model('user', userSchema);

module.exports = User;
