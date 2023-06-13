const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMail = async ({ to, subject, html }, next) => {
  // const from = "sandbox.smtp.mailtrap.io";
  const from = 'matveigoit@outlook.com';
  const email = {
    to,
    from,
    subject,
    html,
  };

  let transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'EMAIL_USER', // generated ethereal user
      pass: 'EMAIL_PASS', // generated ethereal password
    },
  });

  await transport.sendMail(email);
};

module.exports = sendMail;
