const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const auth = require('http-auth');
const path = require('path');

//const Registration = mongoose.model('Registration');


router.get('/', (req, res) => {
    res.render('form', { title: 'Registration', title_heading: 'Registration Form' });
})

router.post('/',
    [
        body('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        body('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
    ],
    (req, res) => {
        console.log(req.body);

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send("Thank you for Registration"); })
                .catch(() => { res.send('Sorry! Something went wrong.'); });
        }
        else {
            res.render('form', { title: 'Registration', title_heading: 'Registration Form', errors: errors.array() });
        }
    })

router.get('/registrations',  (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('list', { title: "Registration List", registrations });
        })
        .catch(() => { res.send('Someting went wrong') });
});

module.exports = router;

//auth.connect(basic),