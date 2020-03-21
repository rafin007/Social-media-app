const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    //get the token from the header
    const token = req.header('authorization').replace('Bearer ', '');

    if (!token) {
      console.log('hey');
      return res.status(401).send({ msg: 'Please authenticate' });
    }

    //if token exists, verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded.user.id).select('-password');

    // if (!user.verified) {
    //   return res.status(400).send({ msg: 'Please verify your email address to continue' });
    // }

    //save both the token and the user to the request object except the password
    req.user = decoded.user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ msg: "Please authenticate" });
  }
};

module.exports = auth;
