const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("email"),
    pass: config.get("pass"),
  },
});

const forgetPassword = async (email, name, token) => {
  const url = `${config.get("frontendURL")}/users/confirmation/${token}`;

  try {
    const mailOptions = {
      from: config.get("email"),
      to: email,
      subject: "Social Media - Forget Password",
      html: `Welcome to the social media, ${name}. Please click this <a href="${url}">link</a> to reset your password. Thank you.`,
    };
    await transporter.sendMail(mailOptions);
    // console.log(info);
  } catch (error) {
    console.log(error);
  }
};

// forgetPassword('rafin.ryan.07@outlook.com', 'Rafin');
module.exports = {
  forgetPassword,
};
