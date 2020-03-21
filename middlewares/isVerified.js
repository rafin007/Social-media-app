const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const isVerified = async (req, res, next) => {
    try {
        //get the token from the header
        const token = req.header("authorization").replace('Bearer ', '');

        if (!token) {
            return res.status(401).send({ msg: 'Please authenticate' });
        }

        //if token exists, verify the token
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const user = await User.findById(decoded.user.id).select('-password');

        //save both the token and the user to the request object except the password
        req.user = user;

        next();
    } catch (error) {
        res.status(401).send({ msg: "Please authenticate" });
    }
};

module.exports = isVerified;
