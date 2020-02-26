const User = require('../models/User');

const isFollowing = (req, res, next) => {
    try {
        //get the user whose information is being accessed
        const user = User.findById(req.params.user_id);

        //check if the req.user is NOT following the user
        if (user.followers.filter(follower => follower.user.toString() === req.user.id).length === 0) {
            req.isFollowing = false;
            return res.status(400).send({ msg: "Sorry, you are not connected with this user" });
        }

        req.isFollowing = true;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = isFollowing;