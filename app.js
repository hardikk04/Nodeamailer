const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.get("/", async (req, res) => {
  await sendEmail(
    "hardiksisodiyaa04@gmail.com",
    "Test Email Subject",
    "This is a test email sent with Nodemailer using OAuth2.",
    "<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>"
  );
  res.send("sent test email");
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000");
});
