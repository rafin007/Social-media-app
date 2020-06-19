const User = require('../models/User');

const isFollowing = async (req, res, next) => {
    try {
        //get the user whose information is being accessed
        const user = await User.findById(req.params.user_id);

        //if no user found, throw error
        if (!user) {
            return res.status(404).send({ errors: [{ msg: 'User not found!' }] });
        }

        //if the logged in user wants to see their own posts
        if (req.params.user_id === req.user.id) {
            return next();
        }

        //check if the req.user is NOT following the user
        if (user.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
            return res.status(400).send({ errors: [{ msg: "Sorry, you are not connected with this user" }] });
        }

        req.otherUser = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = isFollowing;