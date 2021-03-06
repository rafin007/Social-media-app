const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const { check, validationResult } = require("express-validator");
const sharp = require("sharp");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const auth = require("../middlewares/auth");
// const isVerified = require('../middlewares/isVerified');
const { forgetPassword } = require("../email/account");
// const mongoose = require('mongoose');
const isFollowing = require("../middlewares/isFollowing");

const router = express.Router();

//for file upload
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

/*  @route POST /users
    @desc Register user
    @access Public
*/
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("gender", "Please select your gender").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    //properties of users
    const { name, email, password, gender } = req.body;

    try {
      //check if the user's email already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).send({
          errors: [{ msg: "User already exists" }],
        });
      }

      //create the user object
      user = new User({
        name,
        email,
        password,
        gender,
      });

      //get the encrypted password
      user.password = await user.encryptPassword(password);

      //generate random string
      // user.randomString = cryptoRandomString({ length: 6, type: 'base64' }).toUpperCase();

      //send email to user
      // verifyEmail(user.email, user.name, user.randomString);

      //save the user
      await user.save();

      const profile = new Profile();
      profile.user = user.id;

      await profile.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      //return jsonwebtoken
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // { expiresIn: 3600 },
        (error, token) => {
          if (error) throw error;
          res.send({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route GET /users/sendEmailVerification
    @desc Send email to users to verify email address
    @access Protected
*/
//uses the isVerified middleware to retrieve the user
// router.get('/sendEmailVerification', isVerified, (req, res) => {

//   const user = req.user;

//   //generate random string
//   user.randomString = cryptoRandomString({ length: 6, type: 'base64' }).toUpperCase();

//   //send that random string to email
//   verifyEmail(user.email, user.name, user.randomString);
// });

/*  @route POST /users/verifyEmail
    @desc Register user if their email is verified
    @access Protected
*/
// router.post('/verifyEmail', [isVerified, [
//   check('string', 'Verification code cannot be empty').not().isEmpty()
// ]], async (req, res) => {
//   const error = validationResult(req);

//   //if errors, throw them
//   if (!error.isEmpty()) {
//     return res.status(400).send({ errors: error.array() });
//   }

//   const { string } = req.body;

//   if (string !== req.user.randomString) {
//     return res.status(400).send({ msg: 'Sorry, verification code did not match' });
//   }

//   try {
//     //mark as verified user
//     req.user.verified = true;

//     //save user
//     await req.user.save();

//     res.send({ msg: 'Verification successful!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }

// });

/*  @route PATCH /users/changePassword
    @desc Change users' password
    @access Private
*/
router.patch(
  "/changePassword",
  [
    auth,
    [
      check("oldPassword", "Old password cannot be empty").not().isEmpty(),
      check("newPassword", "Password must be at least 6 characters").isLength({
        min: 6,
      }),
      check("confirmPassword", "Field cannot be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ msg: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      //extract the fields
      const { oldPassword, newPassword, confirmPassword } = req.body;

      //throw error if old password doesn't match with user's current password
      const isMatch = await bcryptjs.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(401).send({ msg: "Your old password did not match" });
      }

      //throw error if new password and confirm password don't match
      if (newPassword !== confirmPassword) {
        return res.status(400).send({ msg: "Your new passwords do not match" });
      }

      //check if the previous password is the new password
      if (oldPassword === newPassword) {
        return res
          .status(400)
          .send({ msg: "New password cannot be the same as old password" });
      }

      //save the new password
      user.password = await user.encryptPassword(newPassword);

      //save the user
      await user.save();

      res.send({ msg: "Your password has been changed" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route PATCH /users/changeName
    @desc Change users' password
    @access Private
*/
router.patch(
  "/changeName",
  [auth, [check("name", "Name cannot be empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ msg: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      //extract the fields
      const { name } = req.body;

      //save the new password
      user.name = name;

      //save the user
      await user.save();

      res.send({ msg: "Your name has been changed", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route PATCH /users/changeEmail
    @desc Change users' password
    @access Private
*/
router.patch(
  "/changeEmail",
  [auth, [check("email", "Must be a valid email").isEmail()]],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ msg: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      //extract the fields
      const { email } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .send({ msg: "A user already exists with that email" });
      }

      //save the new password
      user.email = email;

      //save the user
      await user.save();

      res.send({ msg: "Your email has been changed", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route POST /users/recoverPassword
    @desc send email to recover password
    @access Public
*/
router.post(
  "/recover/password/email",
  [check("email", "Email is not valid").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
      const user = await User.findOne({ email });

      //if no user throw error
      if (!user) {
        return res.status(404).send({
          errors: [{ msg: "Sorry no user found with provided email" }],
        });
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
          forgetPassword(user.email, user.name, token);
        }
      );

      res.send({
        msg: "Please check your email to reset your password",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route GET /users/confirmation/:token
    @desc check token from email
    @access Public
*/
router.get("/confirmation/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(400).send({ msg: "Link expired" });
    }

    return res.redirect(
      `${config.get("frontendURL")}/recoverPassword/${token}`
    );
  } catch (error) {
    console.log("Server error");
    res.status(500).send("Server error");
  }
});

//@TODO => redirect user to change their password
/*  @route POST /users/recoverPassword/:email
    @desc check verification code to recover password
    @access Public
*/
// router.post(
//   "/recoverPassword/:email",
//   [check("string", "Verification code cannot be empty").not().isEmpty()],
//   async (req, res) => {
//     const errors = validationResult(req);

//     //if errors, throw them
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }

//     const user = await User.findOne({ email: req.params.email });

//     //check users' string with verification string
//     if (user.randomString !== req.body.string) {
//       return res
//         .status(401)
//         .send({ msg: "Sorry verification code did not match!" });
//     }

//     res.send({ msg: "Matched. yay!!!" });
//   }
// );

/*  @route POST /users/forget/changePassword/
    @desc Change users' password
    @access Private
*/
router.post(
  "/forget/changePassword",
  [
    check("newPassword", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("confirmNewPassword", "Field cannot be empty").not().isEmpty(),
    check("token", "invalid token").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);

    //if errors, throw them
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const { newPassword, confirmNewPassword, token } = req.body;

    try {
      //if token exists, verify the token
      const decoded = jwt.verify(token, config.get("jwtSecret"));

      //find user by email
      const user = await User.findById(decoded.user.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Please authenticate" }] });
      }

      //extract the fields

      //throw error if new password and confirm password don't match
      if (newPassword !== confirmNewPassword) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Your passwords do not match" }] });
      }

      //save the new password
      user.password = await user.encryptPassword(newPassword);

      //save the user
      await user.save();

      res.send({ msg: "Your password has been changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(401).send({
        errors: [{ msg: "Link expired" }],
      });
    }
  }
);

//----------------------------FOLLOW----------------------------------------

/*  if user is private then user.followRequests++
      Accept => user.followRequests--, user.followers++, req.user.following++
      Reject => user.followRequests--
    if not then req.user.following++ and user.followers++
*/

/*  @route GET /users/isPrivate/:user_id
    @desc return if user is private
    @access Private
*/
router.get("/isPrivate/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(404).send({ errors: [{ msg: "User not found!" }] });
    }

    return res.send(user.isPrivate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/get/privacy
    @desc Get users' privacy
    @access Private
*/
router.get("/get/privacy", auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.send({ privacy: false });
    }

    return res.send({ privacy: req.user.isPrivate });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

/*  @route PUT /users/isPrivate
    @desc change user's privacy
    @access Private
*/
router.put("/isPrivate", auth, async (req, res) => {
  try {
    //if !isPrivate then make it true otherwise make it false and take everything from followRequests and followers to following
    if (!req.user.isPrivate) {
      req.user.isPrivate = true;
    } else {
      req.user.isPrivate = false;
      req.user.followers = [...req.user.followRequests, ...req.user.followers];
      req.user.followRequests = [];

      //add this user's id to each follower's following list
      for (let follower of req.user.followers) {
        let user = await User.findById(follower.user);

        //check if a particular follower is already following req.user
        if (
          user.following.filter(
            (follow) => follow.user.toString() === req.user.id
          ).length === 0
        ) {
          user.following.unshift({ user: req.user.id });
        }

        await user.save();
      }
    }

    await req.user.save();

    return res.send(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/checkFollow/:user_id
    @desc check the follow status for a user with correlation with the logged in user 
    @access Private
*/
router.get("/checkFollow/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      res.status(404).send({ errors: [{ msg: "User not found!" }] });
    }

    //check if the logged in user is currently following the user
    if (
      user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.send({ status: "unfollow" });
    }

    //check if the logged in user is currently in the follow request of the user
    if (
      user.followRequests.filter(
        (followReq) => followReq.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.send({ status: "requested" });
    }

    res.send({ status: "follow" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route PUT /users/follow/:user_id
    @desc Follow user by id
    @access Private
*/
router.put("/follow/:user_id", auth, async (req, res) => {
  try {
    //if the req.user wants to follow himself
    if (req.params.user_id === req.user.id) {
      return res
        .status(400)
        .send({ errors: [{ msg: "You cannot follow yourself" }] });
    }

    //find the user
    const user = await User.findById(req.params.user_id);

    // //find the user that is logged in
    // const reqUser = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ errors: [{ msg: "User does not exist" }] });
    }

    //check if the req.user is already following the user
    if (
      user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Already following this user" }] });
    }

    //check if the req.user has already sent a follow request
    if (
      user.followRequests.filter(
        (followReq) => followReq.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).send({
        errors: [
          { msg: "You have already sent a follow request to this user!" },
        ],
      });
    }

    //check if user's profile isPrivate
    if (user.isPrivate) {
      //if not following, then push in followRequests
      user.followRequests.unshift({ user: req.user.id });

      await user.save();
    } else {
      //add req.user to user's followers list
      user.followers.unshift({ user: req.user.id });

      //add the user to req.user's following list
      req.user.following.unshift({ user: user.id });

      //save both
      await req.user.save();
      await user.save();
    }

    //get the req.user
    // const reqUser = await User.findById(req.user.id);

    // //add the user to req.user's following list
    // reqUser.following.unshift({ user: req.params.user_id });

    // await reqUser.save();

    res.send(req.user);

    //check if the user is already in req.user's following list
    // if (reqUser.following.filter(follow => follow.user.toString() === req.params.user_id).length > 0) {
    //   return res.status(400).send({msg: 'A'})
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: "Server error!" }] });
  }
});

/*  @route PUT /users/unfollow/:user_id
    @desc Unfollow user by id
    @access Private
*/
router.put("/unfollow/:user_id", auth, async (req, res) => {
  try {
    //check if the req.user wants to unfollow himself
    if (req.params.user_id === req.user.id) {
      return res
        .status(400)
        .send({ errors: [{ msg: "You cannot unfollow yourself" }] });
    }

    //find the user
    const user = await User.findById(req.params.user_id);

    //if user does not exist then exit
    if (!user) {
      return res.status(404).send({ errors: [{ msg: "User not found!" }] });
    }

    //check if req.user deos NOT exist in the user's followers' list
    if (
      user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .send([{ errors: { msg: "User has not been followed yet!" } }]);
    }

    //get the index to remove from followers' list
    const index = user.followers
      .map((follower) => follower.user.toString())
      .indexOf(req.user.id);

    //remove the index
    user.followers.splice(index, 1);

    //save the user
    await user.save();

    //get the req user
    const reqUser = await User.findById(req.user.id);

    //get the index of req.user's following list
    const reqIndex = reqUser.following
      .map((follow) => follow.user.toString())
      .indexOf(req.params.user_id);

    //remove that index
    reqUser.following.splice(reqIndex, 1);

    //save the req.user
    await reqUser.save();

    res.send(reqUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: "Server error!" }] });
  }
});

/*  @route PUT /users/cancelRequest/:user_id
    @desc Cancel requested follow by user_id
    @access Private
*/
router.put("/cancelRequest/:user_id", auth, async (req, res) => {
  try {
    //get the user
    const user = await User.findById(req.params.user_id);

    //throw error if no user is found
    if (!user) {
      return res.status(404).send({ errors: [{ msg: "No user found" }] });
    }

    //check if the logged in user is in the user's follower's list
    if (
      user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).send({
        errors: [{ msg: "This user has already accepted your request!" }],
      });
    }

    //check if the user's account is indeed private
    if (!user.isPrivate) {
      return res
        .status(400)
        .send({ errors: [{ msg: "This user's account is not private" }] });
    }

    //get the index of logged in user from user's followRequests
    const index = user.followRequests.findIndex(
      (followReq) => followReq.user.toString() === req.user.id
    );

    //check if the logged in user is not in the user's followRequests
    if (index === -1) {
      return res.status(404).send({
        errors: [{ msg: "You have not requested to follow this user" }],
      });
    }

    //remove the index
    user.followRequests.splice(index, 1);

    await user.save();

    res.send("Done");
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send("Server error");
  }
});

/*  @route PUT /users/acceptFollow/:user_id
    @desc Accept follow requests by user_id
    @access Private
*/
router.put("/acceptFollow/:user_id", auth, async (req, res) => {
  try {
    //if the req.user wants to send follow request to himself
    if (req.params.user_id === req.user.id) {
      return res.status(400).send({ msg: "You cannot follow yourself" });
    }

    //find the user that is logged in
    const reqUser = await User.findById(req.user.id);

    const user = await User.findById(req.params.user_id);

    // if there is no user, then exit
    if (!user) {
      return res.status(404).send({ msg: "User not found!" });
    }

    //check if the other user is already a follower
    if (
      reqUser.followers.filter(
        (follower) => follower.user.toString() === req.params.user_id
      ).length > 0
    ) {
      return res
        .status(400)
        .send({ msg: "Sorry, this user is already following you" });
    }

    //find the index and remove from follow requests
    const index = reqUser.followRequests
      .map((followReq) => followReq.user.toString())
      .indexOf(req.params.user_id);
    reqUser.followRequests.splice(index, 1);

    //add to the followers' list
    reqUser.followers.unshift({ user: req.params.user_id });

    //save the req.user
    await reqUser.save();

    //add to the other useer's followling list
    user.following.unshift({ user: req.user.id });

    //save that other user
    await user.save();

    res.send(reqUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route PUT /users/rejectFollowRequest/:user_id
    @desc Reject follow requests by user_id
    @access Private
*/
router.put("/rejectFollow/:user_id", auth, async (req, res) => {
  try {
    //get the logged in user
    const reqUser = await User.findById(req.user.id);

    //find the index of the follow requester
    const index = reqUser.followRequests.findIndex(
      (followReq) => followReq.user.toString() === req.params.user_id
    );

    //check if the other user is in logged in user's followRequests
    if (index === -1) {
      return res
        .status(404)
        .send({ msg: "This person did not request to follow you" });
    }

    //remove that index from array
    reqUser.followRequests.splice(index, 1);

    //save the user
    await reqUser.save();

    res.send(reqUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: error });
  }
});

/*  @route GET /users/followers
    @desc Get followers' list of logged in user
    @access Private
*/
router.get("/followers", auth, async (req, res) => {
  try {
    const profiles = [];

    for (let follower of req.user.followers) {
      let profile = await Profile.findOne({
        user: follower.user,
      }).populate("user", ["avatar", "name", "gender", "isPrivate"]);
      // }).populate("user", ["name", "gender"]);
      profiles.push(profile);
    }

    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/following
    @desc Get following list of logged in user
    @access Private
*/
router.get("/following", auth, async (req, res) => {
  try {
    const profiles = [];

    for (let follow of req.user.following) {
      let profile = await Profile.findOne({
        user: follow.user,
      }).populate("user", ["avatar", "name", "gender", "isPrivate"]);
      // }).populate("user", ["name", "gender"]);
      profiles.push(profile);
    }

    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/followers/:user_id
    @desc Get followers' list of profiles for a particular user
    @access Private
*/
router.get("/followers/:user_id", [auth, isFollowing], async (req, res) => {
  try {
    // res.send(req.otheruser.followers);
    const profiles = [];

    for (let follower of req.otherUser.followers) {
      let profile = await Profile.findOne({
        user: follower.user,
      }).populate("user", ["avatar", "name", "gender"]);
      profiles.push(profile);
    }

    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/following/:user_id
    @desc Get following's list of profiles for a particular user
    @access Private
*/
router.get("/following/:user_id", [auth, isFollowing], async (req, res) => {
  try {
    const profiles = [];

    for (let follow of req.otherUser.following) {
      let profile = await Profile.findOne({
        user: follow.user,
      }).populate("user", ["avatar", "name", "gender"]);
      profiles.push(profile);
    }

    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/followRequests
    @desc Get users' follow requests
    @access Private
*/
router.get("/followRequests", auth, async (req, res) => {
  // try {
  //   const user = await User.findById(req.user.id);

  //   res.send(user.followRequests);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Server error");
  // }
  try {
    const profiles = [];

    for (let followReq of req.user.followRequests) {
      let profile = await Profile.findOne({
        user: followReq.user,
      }).populate("user", ["avatar", "name", "gender"]);
      // }).populate("user", ["name", "gender"]);
      profiles.push(profile);
    }

    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/:user_id
    @desc Get an individual user
    @access Private
*/
router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select("-password");

    //if any of user or avatar not found, throw error
    if (!user) {
      return res.status(404).send({ errors: [{ msg: "User not found" }] });
    }

    //send back the user
    res.send(user);
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

/*  @route GET /users/me/avatar
    @desc Get logged in user's avatar
    @access Private
*/
// router.get('/me/avatar', auth, async (req, res) => {
//   try {
//     const user = req.user;

//     //if any of user or avatar not found, throw error
//     if (!user.avatar) {
//       return res.status(404).send({ errors: [{ msg: 'No avatar' }] });
//     }

//     //set the content type to image
//     res.set('Content-Type', 'image/png');

//     //send the image
//     res.send(user.avatar);
//   } catch (error) {
//     res.status(404).send({ errors: [{ msg: error }] });
//   }
// });

/*  @route POST /users/me/avatar
    @desc Post users' profile picture
    @access Private
*/
router.post(
  "/me/avatar",
  [auth, upload.single("upload")],
  async (req, res) => {
    try {
      const user = req.user;

      //resize and convert to png
      const buffer = await sharp(req.file.buffer)
        .rotate()
        .resize({
          width: 200,
          height: 200,
          fit: "contain",
          background: { r: 255, g: 255, b: 255 },
        })
        .png()
        .toBuffer();

      //save the buffer file in avatar field
      user.avatar = buffer;

      //save the user
      await user.save();

      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
);

/*  @route DELETE /users/me/avatar
    @desc Delete users' profile picture
    @access Private
*/
router.delete("/me/avatar", auth, async (req, res) => {
  try {
    const user = req.user;

    user.avatar = null;

    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/:user_id/avatar
    @desc Get users' profile picture
    @access Private
*/
router.get("/:user_id/avatar", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    //if any of user or avatar not found, throw error
    if (!user || !user.avatar) {
      throw new Error("Not found");
    }

    //set the content type to image
    res.set("Content-Type", "image/png");

    //send the image
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

/*  @route PATCH /users/switch/theme
    @desc Switch users' theme
    @access Private
*/
router.patch("/switch/theme", auth, async (req, res) => {
  try {
    //get the theme
    let theme = req.user.theme;

    //change the theme
    if (!theme || theme === "light") {
      theme = "dark";
    } else {
      theme = "light";
    }

    //save the theme
    req.user.theme = theme;
    await req.user.save();

    res.send({ theme });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /users/get/theme
    @desc Get users' theme
    @access Private
*/
router.get("/get/theme", auth, (req, res) => {
  try {
    if (!req.user) {
      return res.send({ theme: "light" });
    }

    return res.send({ theme: req.user.theme });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

/*  @route DELETE /users/deleteAccount
    @desc Delete user's account
    @access Private
*/
router.delete("/deleteAccount", auth, async (req, res) => {
  try {
    //delete all post of the user first
    await Post.deleteMany({ user: req.user.id });

    //remove req.user from their followers', followings' and other people's request list

    //loop through users where req.user might be in followers and remove that entry
    for (let follow of req.user.following) {
      const user = await User.findById(follow.user).select("-avatar");

      const index = user.followers.findIndex(
        (follower) => follower.user.toString() === req.user.id
      );

      if (index !== -1) {
        user.followers.splice(index, 1);

        await user.save();
      }
    }

    //loop through users where req.user might be in following and remove that entry
    for (let follow of req.user.followers) {
      const user = await User.findById(follow.user).select("-avatar");

      const index = user.following.findIndex(
        (follower) => follower.user.toString() === req.user.id
      );

      if (index !== -1) {
        user.following.splice(index, 1);

        await user.save();
      }
    }

    //get all the users
    const users = await User.find().select("-avatar");

    //check if the req.user is in any user's follow requests, if so then remove that index
    for (let user of users) {
      const index = user.followRequests.findIndex(
        (follower) => follower.user.toString() === req.user.id
      );

      if (index !== -1) {
        user.followRequests.splice(index, 1);

        await user.save();
      }
    }

    //delete the profile of the user
    await Profile.findOneAndDelete({ user: req.user.id });

    //lastly delete the user
    const user = await User.findByIdAndDelete(req.user.id);

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//--------------Special route---------------------------
/*  @route DELETE /users/deleteAccount/:user_id
    @desc Delete user's account
    @access ADMIN
*/
router.delete("/deleteAccount/:user_id", async (req, res) => {
  try {
    //check if user exists
    const selectedUser = await User.findById(req.params.user_id).select(
      "-avatar"
    );

    if (!selectedUser) {
      return res.status(400).send({ msg: "No user found!" });
    }

    //delete all post of the user first
    await Post.deleteMany({ user: req.params.user_id });

    //remove req.params.user_id from their followers', followings' and other people's request list

    //loop through users where req.params.user_id might be in followers and remove that entry
    for (let follow of selectedUser.following) {
      const user = await User.findById(follow.user).select("-avatar");

      const index = user.followers.findIndex(
        (follower) => follower.user.toString() === selectedUser.id
      );

      if (index !== -1) {
        user.followers.splice(index, 1);

        await user.save();
      }
    }

    //loop through users where req.user might be in following and remove that entry
    for (let follow of selectedUser.followers) {
      const user = await User.findById(follow.user).select("-avatar");

      const index = user.following.findIndex(
        (follower) => follower.user.toString() === selectedUser.id
      );

      if (index !== -1) {
        user.following.splice(index, 1);

        await user.save();
      }
    }

    //get all the users
    const users = await User.find().select("-avatar");

    //check if the req.params.user_id is in any user's follow requests, if so then remove that index
    for (let user of users) {
      const index = user.followRequests.findIndex(
        (follower) => follower.user.toString() === selectedUser.id
      );

      if (index !== -1) {
        user.followRequests.splice(index, 1);

        await user.save();
      }
    }

    //delete the profile of the user
    await Profile.findOneAndDelete({ user: selectedUser.id });

    //lastly delete the user
    await User.findByIdAndDelete(selectedUser.id);

    res.send("Done");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
