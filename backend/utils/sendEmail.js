import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log(
    "EMAIL_USER:",
    process.env.EMAIL_USER
);

console.log(
    "EMAIL_PASS:",
    process.env.EMAIL_PASS ? "exists" : "missing"
);

export const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("EMAIL SENT:", info.response);
  } catch (err) {
    console.log("EMAIL ERROR:", err);
  }
};