const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", function (res, req) {
  console.log("API Working Smoothly");
});

const transporter = nodemailer.createTransport({
  port: 465,
  // service:'Gmail',
  host: "smtp.gmail.com",
  secure: true,
  // secureConnection: false,
  logger: true,
  debug: true,

  auth: {
    //   user: process.env.SMTP_MAIL,
    user: "devanshshrivastava07@gmail.com",
    //   pass: process.env.SMTP_PASSWORD
    pass: "zebjucvslhybesua",
  },
  // tls:{
  //     rejectUnAuthorized:true
  // }
});

const port = process.env.PORT || 5000;

app.post("/sendmail", (req, res) => {
  console.log("Send email triggered");
  const { fname, lname, useremail, contact, message, something } = req.body;
  console.log(req.body);
  console.log(something);
  console.log(
    "Email " +
      useremail +
      " contact: " +
      contact +
      "First Name" +
      fname +
      "Last Name " +
      lname +
      "Message: " +
      message
  );
  //   console.log("Email: " + email);
  //   console.log("Subject: " + subject);
  //   console.log("Message: " + message);
  // const email = "abhishekneogi12345678@gmail.com";
  const subject = "JMRK Contact Form Submission";
  // const message = "Noting just testing";
  // const contact = "6232275431";
  // const fname = "Devansh";
  // const lname = "Shrivastava";
  var mailOption = {
    from: useremail,
    to: "info@feevin.in",
    subject: subject,
    html: `<p><b>From: </b>${useremail} <br><br><b>Name: </b>${fname} ${lname}<br><b>Contact Number: </b>${contact}<br><b> Message:</b> ${message}</p>`,
  };

  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      res.json("Error" + err).status(400);
    } else {
      res.json("Email sent Successfully").status(200);
    }
  });
});

app.listen(port, (req, res) => {
  console.log("Server running on port " + port);
});
