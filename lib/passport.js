var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var models = require('../models'),
    User = models.User;

///// DEFINITIONS /////

// PASSPORT METHODS
// serializeUser determines what data from the user object should be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserializeUser gives me req.user
// stores user information outside of db
passport.deserializeUser(function(id, done) {
  User.findOne({
    where : {
      // find a user where the user id of the logged-in user matches a user in the Users table
      id : id
    }
  }).then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err);
  });
});

// OBJECTS
// local strategy instance
// allows us to authenticate users by looking up their data in the db when they log in
var localStrat = new localStrategy({usernameField: 'email'}, function(email, password, done) {
  User.findOne({
    where : {
      // find a user whose email in our db matches the logged in user
      email : email
    }
  }).then(function(user) {
    if (!user) {
      return done(null, false);
    }
    // if user with that email exists, compare password entered with user's stored password
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) {
        return done(err);
      }
      done(null, match ? user : false);
    });
  }).catch(function(err) {
    done(err);
  });
});


// INVOCATIONS
passport.use(localStrat);


module.exports = passport;
