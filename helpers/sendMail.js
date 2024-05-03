import nodemailer from "nodemailer";
import httpError from "./httpError.js";
import config from "../config/index.js";

const { MAIL_PASSWORD: password, MAIL_USER: email } = config;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendMail = (receiver, verifyToken) => {

    const mail = {
      to: receiver,
      from: email,
      subject: "Please verify your email",
      html: `<span>To continue use our service you need </span><a href="http://localhost:${config.PORT}/api/users/verify/${verifyToken}">Verify Email</a>`,
    };

    try{
    transport.sendMail(mail);
    } catch (e) {
        httpError(500, "Spam detected")
    }
};
