import nodemailer from "nodemailer";
import config from "../config/index.js";
import httpError from "./httpError.js";

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

export const sendMail = async (receiver, verifyToken) => {

    const mail = {
      to: receiver,
      from: email,
      subject: "Please verify your email",
      html: `<span>To continue use our service you need </span><a href="http://localhost:${config.PORT}/api/users/verify/${verifyToken}">Verify Email</a>`,
    };

try{
    await transport.sendMail(mail);
} catch (e) {
    if (e.responseCode === 550) {
        throw httpError(550, "Excuse, reached recipients limit. Please try later.")
    }
    throw httpError(500, "Email server error")
}

};
