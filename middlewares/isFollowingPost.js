const Post = require('../models/Post');

const isFollowingPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.post_id).populate('user', ['name', 'avatar', 'followers']);

        //if post not found, throw error
        if (!post) {
            return res.status(404).send({ msg: 'Post not found!' });
        }

        //check if the logged in user wants to comment themselves
        if (post.user._id.toString() === req.user.id) {
            req.post = post;
            return next();
        }

        //check if the req.user is NOT a follower of user
        if (post.user.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
            return res.status(401).send({ msg: 'Follow this user to see their posts' });
        }

        req.post = post;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).send({ msg: 'You are not following this user' });
    }
};

module.exports = isFollowingPost;