import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPPool from "nodemailer/lib/smtp-pool";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: process.env.SMTP_HOST === "smtp.gmail.com" ? true : undefined,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendEmail(options: Mail.Options & Partial<SMTPPool.Options>) {
  try {
    await transporter.sendMail({
      ...options
    });

    console.log("Mail has been sent");

    return;
  } catch (err) {
    console.error(err);
  }
}
