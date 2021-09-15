const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/Users')

passport.use(new LocalStrategy(
    async function (username, password, done) {
        await User.findOne({ username: username }, async function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                const validPassword = await user.comparePassword(password)
                if(validPassword === false) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                const userNopass = await User.findById(user._id, { password: 0 })
                return done(null, userNopass);

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