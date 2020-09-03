const mongoose = require("mongoose");
const config = require("config");

const conString = config.get("mongoURI");

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

  //   const connection = mongoose.connection;

  //   connection.once("open", () => {
  //     const postChangeStream = connection.collection("posts").watch();

  //     postChangeStream.on("change", (change) => {
  //       switch (change.operationType) {
  //         case "insert": {
  //           const post = {
  //             _id: change.fullDocument._id,
  //             user: change.fullDocument.user,
  //             text: change.fullDocument.text,
  //             likes: change.fullDocument.likes,
  //             image: change.fullDocument.image,
  //             comments: change.fullDocument.comments,
  //             date: change.fullDocument.date,
  //           };
  //           console.log(post);
  //           io.of("/socket").emit("newPost", post);
  //           break;
  //         }

  //         case "delete":
  //           console.log("post deleted");
  //           break;
  //       }
  //     });
  //   });
};

module.exports = connectDB;
