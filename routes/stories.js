var express = require('express');
var models = require('../models/index');
var router = express.Router();

router.route('/')
  .get(function(req,res){
    req.user.getStories().then(function(stories){
      res.json(stories);
    }, function(err){
      console.log(err);
    });
  })
  .post(function(req,res){
    models.Story.create({title: req.body.title, UserId: req.user.id }).then(function(story){
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
      next();
    }, function(err){
      next(err); //goes to fail handler in app, unless we set fail handler below with all
    });
  })
  // in addition to showing one story, also indexes story's sections
  .get(function(req,res){
    res.locals.story.getSections().then(function(sections){
      res.json({
        story: {
          title: res.locals.story.title,
          sections: sections
        }
      })
    });
  })
  .patch(function(req,res){
    // updates db using req.body
    res.locals.story.update(req.body).then(function(story){
      res.json(story);
    }, function(err){
      res.sendStatus(500);
    });
  })
  // creates a section in the story
  .post(function(req,res){
    models.Section.create({title: req.body.title,
                           StoryId: res.locals.story.id,
                           overview: req.body.overview,
                           prose: req.body.prose
    }).then(function(section){
        res.json(section);
      }, function(err){
        console.log(err);
    });
  })
  .delete(function(req,res){
    res.locals.story.destroy().then(function(){
      res.send('story deleted');
    }, function(err){
      next(err);
    });
  })
  // fail handler -- next(err) leads here
  .all(function(err, req, res, next){
    if (err){
      res.sendStatus(404);
    }
  });

module.exports = router;
