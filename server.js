const express = require("express");
const app = express();
const db = require("./db");
const medium = require("./medium.js");

require("dotenv").config();

// Node Mailer
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/team", (req, res) => {
  res.render("team");
});

app.get("/events/:id", (req, res) => {
  const eventName = req.params.id;
  res.render(eventName);
});

app.get("/blog", (req, res) => {
  res.render("blog", { posts_arr: itemsArr });
});

app.post("/contactForm", (req, res) => {
  let name = req.body.fullname;
  let email = req.body.email;
  let feedback = req.body.feedback;

  console.log(name, ",", email, ",", feedback);

  if (name.length === 0 || email.length === 0 || feedback.length === 0) {
    res.redirect("/");
  } else {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASS}`,
      },
    });
    // 
    let mailDetails = {
      from: `${process.env.EMAIL}`,
      to: `${process.env.EMAIL}`,
      subject: "Feedback Query",
      text: "Feedback",
      html: `<b>Name:</b> ${name}<br><b>Email: </b>${email}<br><br><b>Feedback:</b><p>${feedback}</p>`
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occured!" + err);
      } else {
        console.log("Email sent successfully");
      }
    });

    res.redirect("/");
  }
});


const router = require("./routes/leaderboard");
const { getEnabledCategories } = require("trace_events");
app.use("/contest", router);


app.listen(process.env.PORT || 3000, function () {
  let PORT;
  if (process.env.PORT === undefined) {
    PORT = 3000;
  } else {
    PORT = process.env.PORT;
  }
  console.log(`Server Runing. Open in Browser http://localhost:${PORT}`);
  db();
});