require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

const mongodb_url = process.env.MONGODB_URL;

const waitlistRoute = require("./src/routes/waitlist");

mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("waitlist in totality");
});

app.use("/api/waitlist", waitlistRoute);

app.listen(1980 || process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started at port 1980 bby ❤️");
  }
});
