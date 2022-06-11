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
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
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
          html: `     <html>

          <head>
              <style>
                  * {
                      margin: 0;
                      padding: 0;
                  }
                  
                  body {
                      font-family: "Open Sans", sans-serif;
                      font-size: 16px;
                      line-height: 1.5;
                      color: #333;
                      background: url(https://i.im.ge/2022/06/11/rH5o3f.png);
                      background-size: cover;
                      width: 400px;
                      margin: 0 auto;
                  }
                  
                  .header {
                      display: flex;
                      flex-direction: column;
                      align-items: left;
                      justify-content: center;
                  }
                  
                  .logo {
                      height: 50px;
                      width: 50px;
                      margin: 30px;
                  }
                  
                  .content {
                      display: flex;
                      flex-direction: column;
                      align-items: left;
                      justify-content: center;
                      margin-top: 30px;
                  }
                  
                  .socials a i {
                      color: rgb(245 158 11);
                      height: 50px;
                      width: 50px;
                  }
                  
                  @media screen and (min-width: 760px) {
                      body {
                          font-family: "Open Sans", sans-serif;
                          font-size: 40px;
                          line-height: 1.5;
                          color: #333;
                          background: url(https://i.im.ge/2022/06/11/rH5o3f.png);
                          background-size: cover;
                          width: 100vw;
                          padding: 0 20px;
                      }
                      .header {
                          display: flex;
                          flex-direction: column;
                          align-items: left;
                          justify-content: center;
                          width: 100vw;
                      }
                      .logo {
                          height: 60px;
                          width: 60px;
                          margin: 30px;
                      }
                      .content {
                          display: flex;
                          flex-direction: column;
                          align-items: left;
                          justify-content: center;
                          width: 100vw;
                          margin-top: 30px;
                      }
                      .socials a i {
                          color: rgb(245 158 11);
                          height: 60px;
                          width: 60px;
                          margin: 10px 20px;
                      }
                  }
              </style>
          
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.css" integrity="sha512-E+53kXnJyuZFSz75xSmTfCpUNj3gp9Bd80TeQQMTPJTVWDRHPOpEYczGwWtsZXvaiz27cqvhdH8U+g/NMYua3A==" crossorigin="anonymous" />
          </head>
          
          <body>
              <div class="header">
                  <center>
                      <img src="https://i.im.ge/2022/06/11/rHibVq.png" class="logo" alt="" />
                  </center>
                  <h4>yaaaay welcome to the waitlist 🎉🥂 ✔"</h4>
              </div>
              <div class="content">
                  <p>
                      <strong>Hi {{ ${req.body.email} }},</strong>
                  </p>
                  <p>You will be notified once we are live 🚀.</p>
                  <p>Thank you for your interest in our growth to help you grow.</p>
          
                  <div class="socials">
                      <p style="margin: 20px auto">
                          follow us on our social media to stay updated
                      </p>
          
                      <a href="https://www.linkedin.com/company/gofitish" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/linkedin.png" style="width: 40px" />
            </a>

            <a href="https://twitter.com/emeraldhycient" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/twitter.png" style="width: 40px" />
            </a>

            <a href="https://wa.me/2347088639675" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/whatsapp.png" style="width: 40px" />
            </a>
                  </div>
              </div>
              <div class="" style="margin-top: 80px">
                  <p>
                      <strong>Best, igweze hycient</strong>
                  </p>
                  <p>stay fit 💪🏾</p>
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
          return res
            .status(500)
            .json({ message: "Something went wrong", error: error });
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
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    } else {
      res.status(200).json({ waitlist });
    }
  });
};

module.exports = {
  postWaitlist,
  getWaitlist,
};
