const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const { usersServices } = require('../services');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const verificationToken = v4();
const password = v4();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${GOOGLE_BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (req, accessToken, refreshToken, profile, done) => {
  try {
    const { email, displayName } = profile;
    const user = await usersServices.findUser({ email }, false);
    if (user) {
      return done(null, user);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await usersServices.createUser({
      email,
      password: hashPassword,
      name: displayName,
      verificationToken,
    });

    return done(null, newUser);
  } catch (err) {
    return done(err, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
