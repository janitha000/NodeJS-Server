
require('./api/models/Registration');
require('./api/models/users');

const app = require('./app');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();



app.use(morgan('dev'));




mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });



// app.use((req, res, next) => {
//     if (req.query.access_token) {
//         next();
//     }
//     else {
//         res.status(401).json("Unauthorized");
//     }
// })

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});


