// const { nanoid } = require("nanoid");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const verificationToken = v4();
const passwordGen = v4();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const avatarUrl = gravatar.url(email);
    const user = await User.findOne({ email });
    if (user) {
      return done(null, { user });
    }

    const password = await bcrypt.hash(passwordGen, 10);
    console.log("password :", password);
    const newUser = await User.create({
      email,
      password,
      name: displayName,
      avatarUrl,
      verificationToken,
    });

    return done(null, { newUser });
  } catch (err) {
    return done(err, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
