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
      let transporter = nodemailer.createTransport({
        host: "gofitish.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "info@gofitish.com", // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      transporter
        .sendMail({
          from: '"igweze hycient 👻" <info@gofitish.com>', // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "yaaaay welcome to the waitlist 🎉🥂 ✔", // Subject line
          html: `      <html> 
            <head> 
              <style> 
                * { 
                  margin: 0; 
                  padding: 0; 
                } 
                body { 
                  font-family: "Open Sans", sans-serif; 
                  font-size: 16px; 
                  line-height: 1.5; 
                  color: #fff; 
                  background: #333; 
                } 
                .container { 
                  max-width: 960px; 
                  margin: 0 auto; 
                } 
                .logo { 
                  margin: 20px 0; 
                } 
                .logo img { 
                  width: 150px; 
                } 
                h2 { 
                  font-size: 2em; 
                  font-weight: 300; 
                  margin-bottom: 10px; 
                  text-align: center; 
                } 
                h3 { 
                  font-weight: 400; 
                  text-align: center; 
                } 
                li { 
                  list-style: none; 
                  display: inline; 
                  margin: 5px; 
                } 
                a { 
                  color: #fff; 
                } 
              </style> 
              <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.css" 
                integrity="sha512-E+53kXnJyuZFSz75xSmTfCpUNj3gp9Bd80TeQQMTPJTVWDRHPOpEYczGwWtsZXvaiz27cqvhdH8U+g/NMYua3A==" 
                crossorigin="anonymous" 
              /> 
            </head> 
            <body> 
              <div class="container"> 
                <div class="logo"> 
                  <center> 
                    <img src="https://i.im.ge/2022/06/11/rHibVq.png" alt="" /> 
                  </center> 
                </div> 
                <h2> 
                ${req.body.email} 
                </h2> 
                <div class="socials"> 
                  <h2>Follow us on social media to stay updated.</h3> 
           
                  <center> 
                  <a href="https://twitter.com/emeraldhycient" target="_blank"> 
                    <img 
                      src="https://i.im.ge/2022/06/11/rHi80P.png" 
                      style="width: 40px" 
                    /> 
                  </a> 
           
                  <a href="https://www.linkedin.com/company/gofitish" target="_blank"> 
                    <img 
                      src="https://i.im.ge/2022/06/11/rHiCCY.png" 
                      style="width: 40px" 
                    /> 
                  </a> 
                </center> 
                </div> 
              </div> 
            </body> 
          </html>`, // html body
        })
        .then((info) => {
          console.log(info);
          return res
            .status(200)
            .json({ message: "yaaaay welcome to the waitlist 🎉🥂 ✔" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Something went wrong" });
        });
      /*return res
        .status(200)
        .json({ message: "yaaaay thank you for joining our waitlist" });*/
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
