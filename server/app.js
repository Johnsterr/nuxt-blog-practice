const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const passportStrategy = require("./middleware/passport-strategy.js");
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const keys = require("./keys");
const app = express();

mongoose
  .connect(keys.MONGODB_URL)
  .then(() => {
    console.log("Application connect with MongoDB!");
  })
  .catch(error => {
    console.log(error);
  });

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
