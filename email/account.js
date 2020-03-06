const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('email'),
        pass: config.get('pass')
    }
});


const verifyEmail = async (email, name, randomString) => {
    try {
        const mailOptions = {
            from: config.get('email'),
            to: email,
            subject: 'Email from node.js',
            text: `Welcome to the social media, ${name}. Your verification code is ${randomString}.
            Thank you!`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

// verifyEmail('rafin.ryan.07@outlook.com', 'Rafin');
module.exports = {
    verifyEmail
}
