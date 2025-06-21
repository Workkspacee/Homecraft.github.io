// otpMailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'parikharjun2002@gmail.com', // Replace with your admin email
     pass: 'dccj npgt ymxr ttwe' // Your generated App Password
  }
});

async function sendOTP(email, otp) {
  const mailOptions = {
    from: 'parikharjun2002@gmail.com',
    to: email,
    subject: 'Your OTP for Signup',
    text: `Your OTP is: ${otp}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendOTP;
