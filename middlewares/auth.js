const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    //get the token from the header
    let token = req.header('authorization');

    if (token) {
      token = token.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).send({
        errors: [{ msg: 'Please authenticate' }]
      });
    }

    //if token exists, verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded.user.id).select('-password');

    // if (!user.verified) {
    //   return res.status(400).send({ msg: 'Please verify your email address to continue' });
    // }

    //save both the token and the user to the request object except the password
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({
      errors: [{ msg: 'Please authenticate' }]
    });
  }
};

module.exports = auth;
