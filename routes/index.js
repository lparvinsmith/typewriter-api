var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var async = require('async');
var bcrypt = require('bcrypt');
var models = require('../models/index'),
    User = models.User;

/* GET home page. */

////// AUTHENTICATION ///////

// GET USER INFO
router.route('/profile')
  .get(function(req, res, next){
    if (req.user) {
      res.send(req.user);
    } else {
      var err = new Error("Not logged in.");
      return next(err);
    }
  });

// REGISTER
router.route('/signup')
  .get(function(req, res, next) {
    res.sendStatus(405);
  })
  .post(function(req, res, next) {
    if(!req.body || !req.body.email || !req.body.password) {
      var err = new Error("No credentials.");
      return next(err);
    }

    async.waterfall([
      function(cb) {
        bcrypt.genSalt(16, cb);
      },
      function(salt, cb) {
        bcrypt.hash(req.body.password, salt, cb);
      },
      function(hash, cb) {
        User.create({
          email : req.body.email,
          password : hash,
          name : req.body.name
        }).then(function(user) {
          cb(null, user);
        }, cb);
      }
      // should also log in user here
    ], function(err, result) {
      if(err) {
        return next(err);
      }

      res.sendStatus(201);
    });
  });

// LOG IN
router.route('/login')
  .get(function(req, res, next) {
    res.sendStatus(405);
  })
  .all(function(req,res, next){
    console.log(req.body.email);
    console.log(req.body.password);
    next();
  })
  .post(passport.authenticate('local'), function(req, res){
    res.sendStatus(201);
  });

// LOG OUT
router.route('/logout')
  .all(function(req, res, next) {
    // if (!req.user) {
    //   var err = new Error("Log in first.");
    //   return next(err);
    // }
    req.logout();
    res.sendStatus(200);
  });

module.exports = router;
