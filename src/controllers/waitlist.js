const nodemailer = require("nodemailer");

const waitlistSchema = require("../models/waitlist");

const postWaitlist = (req, res) => {
  if (!req.body.category || !req.body.email) {
    return res
      .status(400)
      .json({ message: "Please provide category and email" });
  }

  const waitlist = new waitlistSchema({
    category: req.body.category,
    email: req.body.email,
  });

  waitlist.save((err, waitlist) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      /*let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "testAccount.user", // generated ethereal user
          pass: "testAccount.pass", // generated ethereal password
        },
      });

      // send mail with defined transport object
      transporter
        .sendMail({
          from: '"igweze hycient 👻" <support@gofitish.com>', // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "yaaaay welcome to the waitlist 🎉🥂 ✔", // Subject line
          html: "<b>Hello world?</b>", // html body
        })
        .then((info) => {
          console.log(info);
          return res.status(200).json({ message: "Waitlist added" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Something went wrong" });
        });
        */
      return res
        .status(200)
        .json({ message: "yaaaay thank you for joining our waitlist" });
    }
  });
};

const getWaitlist = (req, res) => {
  waitlistSchema.find({}, (err, waitlist) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json({ waitlist });
    }
  });
};

module.exports = {
  postWaitlist,
  getWaitlist,
};
