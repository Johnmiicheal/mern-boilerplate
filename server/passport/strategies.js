const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/schemas');

const Strategies = module.exports;

Strategies.local = new LocalStrategy((email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'User doesn\'t exist' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    return done(null, user);
  });
});
