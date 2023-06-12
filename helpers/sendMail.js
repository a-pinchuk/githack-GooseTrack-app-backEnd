const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMail = async ({ to, subject, html }) => {
  // const from = "sandbox.smtp.mailtrap.io";
  const from = 'matveigoit@outlook.com';
  const email = {
    to,
    from,
    subject,
    html,
  };

  let transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'matveigoit@outlook.com', // generated ethereal user
      pass: 'qwe123goit', // generated ethereal password
    },
  });

  // const transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: EMAIL_USER,
  //     pass: EMAIL_PASS,
  //   },
  // });

  await transport.sendMail(email);
};

module.exports = sendMail;
