var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res) {
    console.log("Register() called");
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    if(user.name == undefined || user.email == undefined ){
        res.status(400).json("User name or email null");
        return;
    }
    
    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            res.status(404).json(err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }

    })(req, res)
}