const express = require("express");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require('../middlewares/auth');

const router = express.Router();

/*  @route POST /users
    @desc Register user
    @access Public
*/
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    //properties of users
    const { name, email, password } = req.body;

    try {
      //check if the user's email already exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists" }] });
      }

      //get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      //create the user object
      user = new User({
        name,
        email,
        password,
        avatar
      });

      //generate salt
      const salt = await bcryptjs.genSalt(10);

      //encrypt user's password
      user.password = await bcryptjs.hash(password, salt);

      //save the user
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      //return jsonwebtoken
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
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);



//@ TODO-------------------
/*  @route PUT /users/follow/:user_id
    @desc Follow user by id
    @access Private
*/
router.put('/follow/:user_id', auth, async (req, res) => {
  try {
    //if the req.user wants to follow himself
    if (req.params.user_id === req.user.id) {
      return res.status(400).send({ msg: 'You cannot follow yourself' });
    }

    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(404).send({ msg: 'User does not exist' });
    }

    //check if the req.user is already following the user
    if (user.followers.filter(follower => follower.user.toString() === req.user.id).length > 0) {
      return res.status(400).send({ msg: 'Already following this user' });
    }

    //check if the req.user is already sent a follow request
    if (user.followRequests.filter(followReq => followReq.user.toString() === req.user.id).length > 0) {
      return res.status(400).send({ msg: 'You have already sent a follow request to this user!' });
    }

    //if not following, then push in followRequests 
    user.followRequests.unshift({ user: req.user.id });

    //save user
    await user.save();

    //get the req.user
    // const reqUser = await User.findById(req.user.id);

    // //add the user to req.user's following list
    // reqUser.following.unshift({ user: req.params.user_id });

    // await reqUser.save();

    res.send(user.followers);

    //check if the user is already in req.user's following list
    // if (reqUser.following.filter(follow => follow.user.toString() === req.params.user_id).length > 0) {
    //   return res.status(400).send({msg: 'A'})
    // }

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


/*  @route PUT /users/acceptFollow/:user_id
    @desc Accept follow requests by user_id
    @access Private
*/
router.put('/acceptFollow/:user_id', auth, async (req, res) => {
  try {

    //if the req.user wants to send follow request to himself
    if (req.params.user_id === req.user.id) {
      return res.status(400).send({ msg: 'You cannot follow yourself' });
    }

    //find the user that is logged in
    const reqUser = await User.findById(req.user.id);

    const user = await User.findById(req.params.user_id);

    // if there is no user, then exit
    if (!user) {
      return res.status(404).send({ msg: 'User not found!' });
    }

    //check if the other user is already a follower
    if (reqUser.followers.filter(follower => follower.user.toString() === req.params.user_id).length > 0) {
      return res.status(400).send({ msg: 'Sorry, this user is already following you' });
    }

    //find the index and remove from follow requests
    const index = reqUser.followRequests.map(followReq => followReq.user.toString()).indexOf(req.params.user_id);
    reqUser.followRequests.splice(index, 1);

    //add to the followers' list
    reqUser.followers.unshift({ user: req.params.user_id });

    //save the req.user
    await reqUser.save();

    //add to the other useer's followling list
    user.following.unshift({ user: req.user.id });

    //save that other user
    await user.save();

    res.send({ msg: 'Request accepted' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



/*  @route PUT /users/unfollow/:user_id
    @desc Unfollow user by id
    @access Private
*/
router.put('/unfollow/:user_id', auth, async (req, res) => {
  try {
    //check if the req.user wants to unfollow himself
    if (req.params.user_id === req.user.id) {
      return res.status(400).send({ msg: 'You cannot unfollow yourself' });
    }

    const user = await User.findById(req.params.user_id);

    //if user does not exist then exit
    if (!user) {
      return res.status(404).send({ msg: 'User not found!' });
    }

    //check if req.user deos NOT exist in the user's followers' list
    if (user.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
      return res.status(400).send({ msg: 'User has not been followed yet!' });
    }

    //get the index to remove from followers' list
    const index = user.followers.map(follower => follower.user.toString()).indexOf(req.user.id);

    //remove the index
    user.followers.splice(index, 1);

    //save the user
    await user.save();

    //get the req user
    const reqUser = await User.findById(req.user.id);

    //get the index of req.user's following list
    const reqIndex = reqUser.following.map(follow => follow.user.toString()).indexOf(req.params.user_id);

    //remove that index
    reqUser.following.splice(reqIndex, 1);

    //save the req.user
    await reqUser.save();

    res.send(user.followers);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



/*  @route GET /users/followers
    @desc Get followers' list
    @access Private
*/
router.get('/followers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.send(user.followers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


/*  @route GET /users/following
    @desc Get following's list
    @access Private
*/
router.get('/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.send(user.following);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


/*  @route GET /users/followRequests
    @desc Get users' follow requests
    @access Private
*/
router.get('/followRequests', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.send(user.followRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
