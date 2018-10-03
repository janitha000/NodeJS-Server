const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/MyDatabase');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

app.get('/', (req, res) => {
    res.sendFile('auth.html', { root: __dirname });
});

app.get('/success', (req, res) => {
    res.send("You ave logged in successfully");
})

app.get('/error', (req, res) => {
    res.send("Error logging in");
})

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    })
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
))

const FACEBOOK_APP_ID = '324639064960686';
const FACEBOOK_APP_SECRET = 'cadd3eb4585ab95175e9ee354a299dc1';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);

    })
)

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callack',
    passport.authenticate('facebook', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/success');
    })

app.post('/auth',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/success');
    }
)
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Application is listening on port " + port);
})

