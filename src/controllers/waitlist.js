const waitlistSchema = require("../models/waitlist");

const postWaitlist = (req, res) => {
  if (!req.body.category || !req.body.email) {
    res.status(400).json({ message: "Please provide category and email" });
  }

  const waitlist = new waitlistSchema({
    category: req.body.category,
    email: req.body.email,
  });

  waitlist.save((err, waitlist) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json({ message: "Waitlist added" });
    }
  });
};

const getWaitlist = (req, res) => {
  waitlistSchema.find({}, (err, waitlist) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
    } else {
      res.status(200).json(waitlist);
    }
  });
};

module.exports = {
  postWaitlist,
  getWaitlist,
};
