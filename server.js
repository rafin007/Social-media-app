const connectDB = require("./DB/db");
const express = require("express");
const expressConfig = require("./expressConfig");
const path = require("path");

//socket.io
const app = expressConfig.init();

//server static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  //   app.get("*", (req, res) => {
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //   });
}

//conncect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
