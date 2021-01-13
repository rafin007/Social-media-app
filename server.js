const connectDB = require("./DB/db");
const expressConfig = require("./expressConfig");

//socket.io
const app = expressConfig.init();

//conncect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
