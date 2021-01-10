//express configuration
const express = require("express");
const cors = require("cors");

// import all the route modules
const users = require("../routes/users");
const posts = require("../routes/posts");
const profile = require("../routes/profile");
const auth = require("../routes/auth");

module.exports.init = () => {
  const app = express();

  //init middlewares
  app.use(express.json({ extended: false }));

  //cors
  app.use(cors());

  //define routes
  app.use("/users", users);
  app.use("/posts", posts);
  app.use("/profile", profile);
  app.use("/auth", auth);

  return app;
};
