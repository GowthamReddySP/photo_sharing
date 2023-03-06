var nodemailer = require("nodemailer");

function sendCredentialstoMail(Email, Password) {
  var transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "g.sugurpatinti@zensar.com",
      pass: "Password@987654321",
    },
  });
  var mailOptions = {
    from: "g.sugurpatinti@zensar.com",
    to: Email,
    text:
      "Your account has been created successfully" +
      "\nYour Email : " +
      Email +
      "\nYour Password : " +
      Password,
    subject: "Login Credentials",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendCredentialstoMail };
