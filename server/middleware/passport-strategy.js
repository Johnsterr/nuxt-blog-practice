const {Strategy, ExtractJwt} = require("passport-jwt");
// const {model} = require("mongoose");
const keys = require("../keys");
const User = require("../models/user.model");

// Autherization: Bearer dk2mes52fldfks#:>?
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT,
};

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload.userId).select("id");

    if (candidate) {
      done(null, candidate);
    } else {
      done(null, false);
    }
  } catch (error) {
    console.error(error);
  }
});
