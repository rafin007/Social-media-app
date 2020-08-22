const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sharp = require("sharp");

const auth = require("../middlewares/auth");
const isFollowing = require("../middlewares/isFollowing");
const isFollowingPost = require("../middlewares/isFollowingPost");
const Post = require("../models/Post");

//file upload
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 2, //max 2MB
  },
  fileFilter(req, file, cb) {
    //check if the file extension is not of an image
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
      return new Error("Please upload an image");
    } else if (file.size > 1024 * 1024 * 2) {
      return new Error("Image size must be less than 2MB");
    }

    //everything goes well
    cb(undefined, true);
  },
});

/*  @route POST /posts
    @desc Create a post
    @access Private
*/
router.post(
  "/",
  [
    auth,
    upload.single("upload"),
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const error = validationResult(req);

    //if error, show them
    if (!error.isEmpty()) {
      res.status(400).send({ errors: error.array() });
    }

    let buffer;

    //check if there is a file
    if (req.file) {
      //resize and convert to png
      buffer = await sharp(req.file.buffer)
        .rotate()
        .resize({
          width: 600,
          height: 600,
          fit: "contain",
          background: { r: 255, g: 255, b: 255 },
        })
        .png()
        .toBuffer();
    }

    //create a new post
    const newPost = new Post({
      ...req.body,
      user: req.user.id,
      image: req.file ? buffer : null,
    });

    try {
      //save the post
      const post = await newPost.save();
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
  (error, req, res) => {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
);

/*  @route GET /posts/me
    @desc Get all posts of logged in user
    @access Private
*/
router.get("/me", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user", ["name", "avatar"]);

    if (posts.length === 0) {
      return res.send();
    }

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /posts/:post_id
    @desc Get post by id
    @access Private
*/
// uses the isFollowingPost middleware to check if the logged in user is a follower of the post's owner
router.get("/:post_id", [auth, isFollowingPost], async (req, res) => {
  try {
    res.send(req.post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /posts/:post_id/image
    @desc Get post's image by id
    @access Private
*/
// router.get('/:post_id/image', [auth, isFollowingPost], async (req, res) => {
//     try {
//         const post = req.post;

//         if (!post.image) {
//             return res.status(400).send({ errors: [{ msg: 'No image found for this post' }] });
//         }

//         res.set('Content-Type', 'image/png');

//         res.send(post.image);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

/*  @route GET /posts
    @desc Get all posts of their following
    @access Private
*/
router.get("/", auth, async (req, res) => {
  //map through req.user's following list
  let posts = [];
  try {
    for (let follow of req.user.following) {
      //get the posts of the user
      let userPosts = await Post.find({ user: follow.user })
        // .sort({ date: -1 })
        .populate("user", ["name", "avatar"]);
      posts.push(userPosts);
    }

    //flatten the array
    posts = posts.flat();

    //sort posts in descending order by date
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /posts/users/:user_id
    @desc Get all posts of a user
    @access Private
*/
//uses the isFollowing middleware to check if the logged in user is a follower of the searched user
router.get("/users/:user_id", [auth, isFollowing], async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.user_id })
      .sort({ date: -1 })
      .populate("user", ["name", "avatar"]);

    if (posts.length === 0) {
      return res.send();
    }

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route PATCH /posts/:post_id
    @desc Update post by id
    @access Private
*/
router.patch(
  "/:post_id",
  [
    auth,
    upload.single("upload"),
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if error throw them
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }

    try {
      //get the post
      let post = await Post.findById(req.params.post_id);

      //check if the post exists
      if (!post) {
        return res.status(404).send({ errors: [{ msg: "Post not found" }] });
      }

      //check if the request is made by the author of the post
      if (post.user.toString() !== req.user.id) {
        return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
      }

      let buffer;

      //check if there is a file
      if (req.file) {
        //resize and convert to png
        buffer = await sharp(req.file.buffer)
          .rotate()
          .resize({
            width: 600,
            height: 600,
            fit: "contain",
            background: { r: 255, g: 255, b: 255 },
          })
          .png()
          .toBuffer();
      }

      //edit the post
      post.text = req.body.text;
      post.image = req.file ? buffer : post.image;

      //save the post
      await post.save();

      res.send(post);
    } catch (error) {
      console.error(error);
      if (error.kind === "ObjectId")
        return res.status(404).send({ errors: [{ msg: "Post not found!" }] });
      res.status(500).send("Server error");
    }
  }
);

/*  @route DELETE /posts/:post_id
    @desc Delete post by id
    @access Private
*/
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //check if the post exists
    if (!post) {
      return res.status(404).send({ errors: [{ msg: "Post not found!" }] });
    }

    //check if the request is made by the author of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }

    await post.remove();

    res.send(post);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId")
      return res.status(404).send({ errors: [{ msg: "Post not found!" }] });

    res.status(500).send("Server error");
  }
});

/*  @route PUT /posts/like/:post_id
    @desc Like post by id
    @access Private
*/
router.put("/like/:post_id", [auth, isFollowingPost], async (req, res) => {
  try {
    const post = req.post;

    //check if that post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send({ errors: [{ msg: "Post already liked" }] });
    }

    //if not liked then like it
    post.likes.unshift({ user: req.user.id });

    //save the post
    await post.save();

    return res.send(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route PUT /posts/unlike/:post_id
    @desc Unlike post by id
    @access Private
*/
router.put("/unlike/:post_id", [auth, isFollowingPost], async (req, res) => {
  try {
    const post = req.post;

    //check if that post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send({ errors: [{ msg: "Post not liked yet" }] });
    }

    //get the index of the like
    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    //remove that index from likes array
    post.likes.splice(index, 1);

    //save the post
    await post.save();

    return res.send(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/*  @route GET /posts/comments/:post_id
    @desc Get all comments of a post by id
    @access Private
*/
//uses the isFollowingPost middleware to check if the logged in user is a follower of the post's owner
router.get("/comments/:post_id", [auth, isFollowingPost], async (req, res) => {
  const post = req.post;

  if (post.comments.length === 0) {
    return res.send({ msg: "This post has no comments" });
  }

  res.send(post.comments);
});

/*  @route POST /posts/comments/:post_id
    @desc Post comment on post by id
    @access Private
*/
//uses the isFollowingPost middleware to check if the logged in user is a follower of the post's owner
router.post(
  "/comments/:post_id",
  [
    auth,
    isFollowingPost,
    [check("text", "Text field is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      //make the comment
      const comment = {
        user: req.user.id,
        ...req.body,
      };

      //push it to the array
      req.post.comments.unshift(comment);

      //save the comment
      await req.post.save();

      res.send(req.post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route PATCH /posts/comments/:post_id/:comment_id
    @desc Update comment on post by ids
    @access Private
*/
router.patch(
  "/comments/:post_id/:comment_id",
  [auth, [check("text", "Text field is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    //if errors, throw them
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id);

      //if no post, throw error
      if (!post) {
        return res.status(404).send({ msg: "Post not found!" });
      }

      //get the comment and the index
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      const index = post.comments.findIndex(
        (comment) => comment.id === req.params.comment_id
      );

      //if comment not found throw error
      if (!comment) {
        return res.status(404).send({ msg: "Comment not found!" });
      }

      //check if it is NOT the author of the comment
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).send({ msg: "Unauthorized" });
      }

      //update the comment
      for (let key in req.body) {
        comment[key] = req.body[key];
      }

      //update the comments array
      post.comments.splice(index, 1, comment);

      await post.save();

      res.send(post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

/*  @route DELETE /posts/comments/:post_id/:comment_id
    @desc Delete comment on post by id
    @access Private
*/
router.delete("/comments/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //if no post, throw error
    if (!post) {
      return res.status(404).send({ msg: "Post not found!" });
    }

    //get the comment and the index
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    const index = post.comments.findIndex(
      (comment) => comment.id === req.params.comment_id
    );

    //if comment not found throw error
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found!" });
    }

    //check if it is NOT the author of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    //delete from the comments array
    post.comments.splice(index, 1);

    await post.save();

    res.send(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
