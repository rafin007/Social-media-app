const express = require("express");
const connectDB = require("./DB/db");

// import all the route modules
const users = require("./routes/users");
const posts = require("./routes/posts");
const profile = require("./routes/profile");
const auth = require("./routes/auth");

const app = express();

//init middlewares
app.use(express.json({ extended: false }));

//conncect to database
connectDB();

const PORT = process.env.PORT || 5000;

// base route
// app.get("/", (req, res) => {
//   res.send("helo!!");
// });

//define routes
app.use("/users", users);
app.use("/posts", posts);
app.use("/profile", profile);
app.use("/auth", auth);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
