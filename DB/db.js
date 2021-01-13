const mongoose = require("mongoose");
const config = require("config");

const conString = process.env.MONGODB_URI || config.get("mongoURI");

//connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
