//express configuration
const express = require("express");

// import all the route modules
const users = require("../routes/users");
const posts = require("../routes/posts");
const profile = require("../routes/profile");
const auth = require("../routes/auth");
const chat = require("../routes/Chat");

module.exports.init = () => {
  const app = express();

  //init middlewares
  app.use(express.json({ extended: false }));

  //define routes
  app.use("/users", users);
  app.use("/posts", posts);
  app.use("/profile", profile);
  app.use("/auth", auth);
  app.use("/chat", chat);

  return app;
};
