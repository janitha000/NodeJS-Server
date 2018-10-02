const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

var auth = jwt({
    secret : 'MY_SECRET',
    userProperty: 'payload'
});

var authenticationController = require("../controllers/authenticationController");
var profileController = require("../controllers/profileController");

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.get('/profile', profileController.profileList);


   
module.exports = router;
