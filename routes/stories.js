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

router.route('/:id')
  .all(function(req,res,next){
    //add story id as property of response: makes res.locals.story available to each of following handlers
    models.Story.findById(req.params.id).then(function(story){
      res.locals.story = story;
      console.log('req.params.id is:' +req.params.id + 'and story is: ' + res.locals.story);
      next();
    }, function(err){
      next(err); //goes to fail handler in app, unless we set fail handler below with all
    });
  })
  .get(function(req,res){
    res.json(res.locals.story);
  })
  // .patch(function(req,res){
  //   // updates db using req.body
  //   res.locals.story.update(req.body).then(function(story){
  //     res.json(story);
  //   }, function(err){
  //     res.sendStatus(500);
  //   });
  // })
  // .delete(function(req,res){
  //   res.send("story#delete");
  // })
  // fail handler -- next(err) leads here
  .all(function(err, req, res, next){
    if (err){
      res.sendStatus(404);
    }
  });

module.exports = router;
