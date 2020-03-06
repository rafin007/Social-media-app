const mongoose = require('mongoose');
const config = require('config');

const conString = config.get('mongoURI');

//connect to mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(conString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connection established');
    }
    catch (error) {
        console.log(error);

        //exit program with a failure
        process.exit(1);
    }
};

module.exports = connectDB;