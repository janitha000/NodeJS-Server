const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose= require('mongoose');

const user = mongoose.model('User');

passport.use(new localStrategy({
    usernameField: 'email'
  },
  function(username, password, done){
      user.findOne({email : username}, function(err,user){
          if(err) {return done(err);}

          if(!user){
              return done(null, false, {
                  message : 'User not found'
              });
          }
          if(!user.validPassword(password)){
              return done(null, false, {
                message : 'Incorrect password'
              });
          }
          return done(null, user);
      })
  }
));