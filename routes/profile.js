const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middlewares/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

/*  @route GET /profile/me
    @desc Get User's profile
    @access Private
*/
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar", "gender"]);

    res.send(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route POST /profile/bio
    @desc Update/Post bio
    @access Private
*/
router.post(
  "/bio",
  [auth, [check("bio", "Bio is required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar", "gender"]);

      profile.bio = req.body.bio;

      await profile.save();

      res.send(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route POST /profile/personal
    @desc Update/Create Personal Profile
    @access Private
*/
router.post(
  "/personal",
  [
    auth,
    [
      check("profession", "Profession is required").not().isEmpty(),
      check("birthday", "Birthday is required").not().isEmpty(),
      check("address", "Address cannot be empty").not().isEmpty(),
      // check('website', 'Must be a website').isURL()
    ],
  ],
  async (req, res) => {
    //check for errors
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const profileFields = {};

    for (let key in req.body) {
      profileFields[key] = req.body[key];
    }

    // profileFields.user = req.user.id;

    try {
      //check if the profile exists, if found modify

      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        profileFields,
        { new: true, useFindAndModify: false }
      ).populate("user", ["name", "avatar", "gender"]);

      res.send(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route POST /profile/social
    @desc Add social links
    @access Private
*/
router.post(
  "/social",
  [
    auth,
    [
      check("name", "Social media name cannot be empty").not().isEmpty(),
      check("username", "Username cannot be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //check for errors
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const newMedia = {};

    for (let key in req.body) {
      newMedia[key] = req.body[key];
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "gender", "avatar"]);

      profile.social.push(newMedia);

      await profile.save();

      res.send(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route DELETE /profile/social
    @desc Delete social links
    @access Private
*/
router.delete("/social/:social_id", auth, async (req, res) => {
  try {
    //get the user profile
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "gender", "avatar"]);

    let newMedias = [];

    if (profile.social.length > 0) {
      //delete the social link
      newMedias = profile.social.filter(
        (social) => social.id !== req.params.social_id
      );
    }

    //assign it back to profile
    profile.social = [...newMedias];

    //save it and return the profile
    await profile.save();
    return res.send(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route POST /profile
    @desc Update/Create Profile
    @access Private
*/
// router.post('/', [auth, [
//     //status and skills should be required
//     check('status', 'Status is required').not().isEmpty(),
//     check('skills', 'Skills are required').not().isEmpty()
// ]], async (req, res) => {
//     //check if there are errors
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         res.status(400).send({ errors: error.array() });
//     }

//     //check if those fields are filled
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     profileFields.social = {};

//     for (let key in req.body) {
//         if (key === 'skills') {
//             profileFields.skills = req.body.skills.split(',').map(skill => skill.trim());
//         }
//         else if (key === 'youtube' || key === 'instagram' || key === 'facebook' || key === 'twitter' || key === 'linkedin') {
//             if (key) profileFields.social[key] = req.body[key];
//         }
//         else if (key) {
//             profileFields[key] = req.body[key];
//         }
//     }

//     //check if profile exist
//     try {
//         let profile = await Profile.findOne({ user: req.user.id });
//         //if profile is found then update profile
//         if (profile) {
//             profile = await Profile.findOneAndUpdate({ user: req.user.id }, profileFields, { new: true });

//             return res.send(profile);
//         }

//         //if profile not found then create it
//         profile = new Profile(profileFields);

//         await profile.save();
//         res.send(profile);
//     }
//     catch (error) {
//         res.status(500).send('Server Error');
//     }

// });

/*  @route GET /
    @desc Get all users' profile
    @access Public
*/
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "avatar",
      "name",
      "gender",
      "followers",
      "followRequests",
    ]);

    res.send(profiles);
  } catch (error) {
    console.error("Server error");
  }
});

//-----------------------------------Conflicting routes in express---------------------------------------

/*  @route GET /profile/experience
    @desc Get all experiences of user
    @access Private
*/
router.get("/experience", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    res.send(profile.experience);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /profile/education
    @desc Get all educations of user
    @access Private
*/
router.get("/education", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    res.send(profile.education);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//-----------------------------------Conflicting routes in express---------------------------------------

/*  @route GET /profile/:user_id
    @desc Get profile by profile_id
    @access Public
*/
router.get("/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.user_id).populate(
      "user",
      ["name", "avatar", "gender", "followers", "following", "followRequests"]
    );

    if (!profile) {
      return res.status(400).send({ errors: [{ msg: "Profile not found!" }] });
    }

    res.send(profile);
  } catch (error) {
    if (error.kind == "ObjectId")
      return res.status(400).send({ errors: [{ msg: "Profile not found!" }] });

    console.error("Server error");
  }
});

/*  @route GET /profile/user/:user_id
    @desc Get profile by user_id
    @access Public
*/
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).send({ errors: [{ msg: "Profile not found!" }] });
    }

    res.send(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
});

/*  @route DELETE /profile
    @desc Delete profile of user
    @access Private
*/
router.delete("/", auth, async (req, res) => {
  try {
    //@todo - remove user posts

    //delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //delete user
    await User.findByIdAndRemove(req.user.id);

    res.send([{ msg: "User deleted" }]);
  } catch (error) {
    console.error("Server error");
  }
});

/*  @route POST /profile/experience
    @desc Delete profile of user
    @access Private
*/
router.post(
  "/experience",
  [
    auth,
    [
      check("title", "Job title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);

    //if there are errors, throw them
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const newExp = {};
    //destructure every property by it's name
    for (let key in req.body) {
      newExp[key] = req.body[key];
    }

    try {
      //fetch the profile of the user
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "gender", "avatar"]);

      //add the experience on top
      profile.experience.unshift(newExp);

      //save the profile
      await profile.save();

      res.send(profile);
    } catch (error) {
      res.status(500).send("Sever error");
      console.error(error);
    }
  }
);

/*  @route DELETE /profile/experience/experience_id
    @desc Delete experience by ID
    @access Private
*/
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    //get the profile of user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "gender", "avatar"]);

    let newExp = [];

    //check if user has experience
    if (profile.experience.length > 0) {
      //return all but that experience

      newExp = profile.experience.filter((exp) => exp.id !== req.params.exp_id);
    }

    profile.experience = [...newExp];

    //save the profile
    await profile.save();

    res.send(profile);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
});

/*  @route PATCH /profile/experience/exp_id
    @desc Update experience by ID
    @access Private
*/
router.patch(
  "/experience/:exp_id",
  [
    auth,
    [
      //validate title, company and from
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, show them
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      //get the profile of user
      const profile = await Profile.findOne({ user: req.user.id });

      //get the experience index
      const index = profile.experience
        .map((exp) => exp.id)
        .indexOf(req.params.exp_id);

      //get the experience by id
      // const experience = profile.experience.filter(exp => exp.id === req.params.exp_id);
      const experience = {};

      //destructure every object in experience[0] which is an object
      for (let key in req.body) {
        experience[key] = req.body[key];
      }

      //replace that experience object from original array with edited experience
      profile.experience.splice(index, 1, experience);

      //save the profile
      await profile.save();

      res.send(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

//------------------education-----------------

/*  @route POST /profile/education
    @desc Post education of user
    @access Private
*/
router.post(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);

    //if there are errors, throw them
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    const newEdu = {};
    //destructure every property by it's name
    for (let key in req.body) {
      newEdu[key] = req.body[key];
    }

    try {
      //fetch the profile of the user
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "gender", "avatar"]);

      //add the education on top
      profile.education.unshift(newEdu);

      //save the profile
      await profile.save();

      res.send(profile);
    } catch (error) {
      res.status(500).send("Sever error");
      console.error(error);
    }
  }
);

/*  @route DELETE /profile/experience/:edu_id
    @desc Delete education by ID
    @access Private
*/
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //get the profile of user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "gender", "avatar"]);

    let newEdu = [];

    //check if user has education
    if (profile.education.length > 0) {
      //return all but that education

      newEdu = profile.education.filter((edu) => edu.id !== req.params.edu_id);
    }

    profile.education = [...newEdu];

    //save the profile
    await profile.save();

    res.send(profile);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
});

/*  @route PATCH /profile/education/edu_id
    @desc Update education by ID
    @access Private
*/
router.patch(
  "/education/:edu_id",
  [
    auth,
    [
      //validate title, company and from
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, show them
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      //get the profile of user
      const profile = await Profile.findOne({ user: req.user.id });

      //get the education index
      const index = profile.education
        .map((edu) => edu.id)
        .indexOf(req.params.edu_id);

      //get the education by id
      const education = {};

      //destructure every object in education[0] which is an object
      for (let key in req.body) {
        education[key] = req.body[key];
      }

      //replace that education object from original array with edited education
      profile.education.splice(index, 1, education);

      //save the profile
      await profile.save();

      res.send(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
