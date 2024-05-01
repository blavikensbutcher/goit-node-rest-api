import nodemailer from "nodemailer";

// Usually we have a config file (config/index.js) where we store all config variables
const { MAIL_PASSWORD: password, MAIL_USER: email } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
};

// "transport" should be as a Singleton and not be created in each function in the "sendMail.js"
// const transport = nodemailer.createTransport(nodemailerConfig);

// This function should take responsibility only for sending emails and not for the content of this email.
// const sendMail = (receiver, payload) => {}
export const sendMail = (receiver, verifyToken) => {
  // delete transport from the function
    const transport = nodemailer.createTransport(nodemailerConfig);

    const mail = {
      to: receiver,
      from: email,
      subject: "Please verify your email",
      html: `<span>To continue use our service you need </span><a href="http://localhost:${process.env.PORT}/api/users/verify/${verifyToken}">Verify Email</a>`,
    };

    transport.sendMail(mail);
};
