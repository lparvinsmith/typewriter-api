var express = require('express');
var models = require('../models/index');
var router = express.Router();

router.route('/')
  .get(function(req,res){
    models.Story.findAll({}).then(function(stories){
      res.json(stories);
    }, function(err){
      console.log(err);
    });
  })
  .post(function(req,res){
    models.Story.create(req.body).then(function(story){
        res.json(story);
      }, function(err){
        console.log(err);
    });
  });

module.exports = router;
