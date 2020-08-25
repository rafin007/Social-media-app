const express = require("express");
const { validationResult, check } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const router = express.Router();
const User = require("../models/User");

/*  @route GET /auth
    @desc check if user is authenticated
    @access RESTRICTED
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route POST /auth
    @desc Login users
    @access Public
*/
router.post(
  "/",
  [
    check("email", "Please insert a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const { email, password } = req.body;

    try {
      //find the user with email
      const user = await User.findOne({ email });

      //if user does not exist then throw error
      if (!user) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Invalid credentials" }] });
      }

      //if user does exist compare their password
      const isMatch = await bcryptjs.compare(password, user.password);

      //if password does not match throw error
      if (!isMatch) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Invalid credentials" }] });
      }

      //declare payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //if password matches, assign them a token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.send({ token });
        }
      );
    } catch (error) {
      return res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
