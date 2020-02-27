const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');
const isFollowing = require('../middlewares/isFollowing');
const Post = require('../models/Post');
const User = require('../models/User');

/*  @route POST /posts
    @desc Create a post
    @access Private
*/
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const error = validationResult(req);

    //if error, show them
    if (!error.isEmpty()) {
        res.status(400).send({ errors: error.array() });
    }

    //create a new post
    const newPost = new Post({
        ...req.body,
        user: req.user.id
    });

    try {
        //save the post
        const post = await newPost.save();
        res.send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



/*  @route GET /posts/:post_id
    @desc Get post by id
    @access Private
*/
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id).populate('user', ['name', 'avatar', 'followers']);

        //if post not found, throw error
        if (!post) {
            return res.status(404).send({ msg: 'Post not found!' });
        }

        //check if the req.user is NOT a follower of user
        if (post.user.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
            return res.status(400).send({ msg: 'Follow this user to see their posts' });
        }

        res.send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/*  @route GET /posts
    @desc Get all posts of logged in user
    @access Private
*/
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });

        if (posts.length === 0) {
            return res.status(400).send({ msg: 'You have no posts yet' });
        }

        res.send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/*  @route GET /posts/users/:user_id
    @desc Get all posts of a user
    @access Private
*/
//uses the isFollowing middleware to check if the logged in user is a follower of the searched user
router.get('/users/:user_id', [auth, isFollowing], async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.user_id });

        if (posts.length === 0) {
            return res.send({ msg: 'This user has no posts' });
        }

        res.send(posts);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/*  @route PATCH /posts/:post_id
    @desc Update post by id
    @access Private
*/
router.patch('/:post_id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
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
            return res.status(404).send({ msg: 'Post not found' });
        }

        //check if the request is made by the author of the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'Unauthorized' });
        }

        //edit the post
        for (let key in req.body) {
            post[key] = req.body[key];
        }
        //save the post
        await post.save();

        res.send(post);

    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        res.status(500).send('Server error');
    }

});


/*  @route DELETE /posts/:post_id
    @desc Delete post by id
    @access Private
*/
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //check if the post exists
        if (!post) {
            return res.status(404).send({ msg: 'Post not found!' });
        }

        //check if the request is made by the author of the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'Unauthorized' });
        }

        await post.remove();

        res.send({ msg: 'Post removed' });


    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') return res.status(404).send({ msg: 'Post not found!' });

        res.status(500).send('Server error');
    }
});


/*  @route PUT /posts/like/:post_id
    @desc Like post by id
    @access Private
*/
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //check if post exists
        if (!post) {
            return res.status(404).send({ msg: 'Post not found!' });
        }

        //check if that post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).send({ msg: 'Post already liked' });
        }

        //if not liked then like it
        post.likes.unshift({ user: req.user.id });

        //save the post
        await post.save();

        return res.send(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/*  @route PUT /posts/unlike/:post_id
    @desc Unlike post by id
    @access Private
*/
router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //check if post exists
        if (!post) {
            return res.status(404).send({ msg: 'Post not found!' });
        }

        //check if that post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).send({ msg: 'Post not liked yet' });
        }

        //get the index of the like
        const index = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        //remove that index from likes array
        post.likes.splice(index, 1);

        //save the post
        await post.save();

        return res.send(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;