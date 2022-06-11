const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Waitlist", waitlistSchema);
