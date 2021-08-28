const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/Users')
const jwt = require('jsonwebtoken')
const config = require('../../../../config/index')

passport.use(new LocalStrategy(
    async function (username, password, done) {
        await User.findOne({ username: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.comparePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});