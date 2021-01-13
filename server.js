const connectDB = require("./DB/db");
const express = require("express");
// import all the route modules
const users = require("./routes/users");
const posts = require("./routes/posts");
const profile = require("./routes/profile");
const auth = require("./routes/auth");

//intialize app
const app = express();

//init middlewares
app.use(express.json({ extended: false }));

//conncect to database
connectDB();

//define routes
app.use("/users", users);
app.use("/posts", posts);
app.use("/profile", profile);
app.use("/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
