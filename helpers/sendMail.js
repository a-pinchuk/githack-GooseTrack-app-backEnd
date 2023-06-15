const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMail = async ({ to, subject, html }) => {
  // const from = "sandbox.smtp.mailtrap.io";
  const from = 'matvei.goit@meta.ua';
  const email = {
    to,
    from,
    subject,
    html,
  };

  let transport = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
};

module.exports = sendMail;
