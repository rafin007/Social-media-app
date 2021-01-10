const Post = require("../models/Post");

const getPaginatedPosts = (page) => {
  const limit = 4;
  page = parseInt(page);

  const skip = (page - 1) * limit;

  // const posts = !query
  //   ? await Post.find()
  //       .sort({ date: -1 })
  //       .skip(skip)
  //       .limit(limit)
  //       .select("-image")
  //   : await Post.find({ query })
  //       .sort({ date: -1 })
  //       .skip(skip)
  //       .limit(limit)
  //       .select("-image");

  return { limit, skip };
};

module.exports = getPaginatedPosts;
