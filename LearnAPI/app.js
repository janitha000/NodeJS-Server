const express = require("express");
require('./api/models/Registration');
require('./api/models/users');

const homePage = require('./index');
const userRoutes = require('./api/routes/userRoute');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');




require('./api/config/passport');

const app = express();
app.use(cors({credentials: true, origin: true}));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', homePage);

app.use(express.static('public'));

app.use(passport.initialize());
app.use('/api/user', userRoutes);

module.exports = app;