require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");


const student = {
  name: "SNEHA RAWAT",
  semester: "7th",
  branch: "CSE",
  rollNumber: "230180101051"
};

async function sendAssignmentEmail() {
  const required = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "TO_EMAIL", "ATTACHMENT_PATH"];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing ${key}. Create Challenge2/.env using .env.example.`);
    }
  }

  const attachmentPath = path.resolve(__dirname, process.env.ATTACHMENT_PATH);
  if (!fs.existsSync(attachmentPath)) {
    throw new Error(`Attachment not found: ${attachmentPath}`);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: "Challenge 3 Completed - Node.js Assignment",
    text:
      `Name: ${student.name}\n` +
      `Semester: ${student.semester}\n` +
      `Branch: ${student.branch}\n` +
      `Roll Number: ${student.rollNumber}\n`,
    attachments: [{ path: attachmentPath }]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully:", info.messageId);
}

sendAssignmentEmail().catch((error) => {
  console.error("Email was not sent:", error.message);
  process.exitCode = 1;
});
