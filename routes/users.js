const express = require("express");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require('multer');
const { check, validationResult } = require("express-validator");
const sharp = require('sharp');
const cryptoRandomString = require('crypto-random-string');

const User = require("../models/User");
const auth = require('../middlewares/auth');
const isVerified = require('../middlewares/isVerified');
const { verifyEmail } = require('../email/account');

const router = express.Router();

//@TODO => FIX the value of random String
//generate random string
const randomString = cryptoRandomString({ length: 6, type: 'base64' }).toUpperCase();

//for file upload
const upload = multer({
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  }
});

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
          .send({ msg: "User already exists" });
      }

      //create the user object
      user = new User({
        name,
        email,
        password
      });

      //generate salt
      const salt = await bcryptjs.genSalt(10);

      //encrypt user's password
      user.password = await bcryptjs.hash(password, salt);

      //send email to user
      verifyEmail(user.email, user.name, randomString);

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

/*  @route GET /users/sendVerification
@desc Send email to users to verify
@access Protected
*/
//uses the isVerified middleware to retrieve the user
router.get('/sendEmailVerification', isVerified, (req, res) => {

  const user = req.user;

  //send that random string to email
  verifyEmail(user.email, user.name, randomString);
});


/*  @route POST /users/verifyEmail
    @desc Register user if their email is verified
    @access Protected
*/
router.post('/verifyEmail', [isVerified, [
  check('string', 'Verification code cannot be empty').not().isEmpty()
]], async (req, res) => {
  const error = validationResult(req);

  //if errors, throw them
  if (!error.isEmpty()) {
    return res.status(400).send({ errors: error.array() });
  }

  const { string } = req.body;

  if (string !== randomString) {
    return res.status(400).send({ msg: 'Sorry, verification code did not match' });
  }

  try {
    //mark as verified user
    req.user.verified = true;

    //save it
    await req.user.save();

    res.send({ msg: 'Verification successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }

});



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


/*  Example file upload
*/
// const multer = require('multer');
// const upload = multer({
//   dest: 'avatars',
//   limits: {
//     fileSize: 1024 * 1024
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
//       return cb(new Error('Please upload an image'));
//     }
//     cb(undefined, true);
//   }
// });

// router.post('/me/avatar', upload.single('upload'), (req, res) => {
//   res.send('file uploaded');
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message });
// });


/*  @route POST /users/avatar/me
    @desc Post users' profile picture
    @access Private
*/
router.post('/me/avatar', [auth, upload.single('upload')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    //resize and convert to png
    const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer();
    //save the buffer file in avatar field
    user.avatar = buffer;

    //save the user
    await user.save();

    res.send({ msg: 'Image uploaded' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}, (error, req, res, next) => {
  res.status(400).send({ msg: error.message });
});


/*  @route DELETE /users/avatar/me
    @desc Delete users' profile picture
    @access Private
*/
router.delete('/me/avatar', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    user.avatar = null;

    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


/*  @route GET /users/avatar/me
    @desc Get users' profile picture
    @access Private
*/
router.get('/:user_id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    //if any of user or avatar not found, throw error
    if (!user || !user.avatar) {
      throw new Error('Not found');
    }

    //set the content type to image
    res.set('Content-Type', 'image/png');

    //send the image
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

module.exports = router;
