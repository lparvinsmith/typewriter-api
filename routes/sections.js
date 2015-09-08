var express = require('express');
var models = require('../models/index');
var router = express.Router();

// for section index and section create, see route/stories
// only need routes for id - edit, show one, delete
// images - create and index images here
router.route('/:id')
  .all(function(req,res,next){
    // makes res.locals.section available to each of following handlers
    models.Section.findById(req.params.id).then(function(section){
      res.locals.section = section;
      next();
    }, function(err){
      next(err); //goes to fail handler in app, unless we set fail handler below with all
    });
  })
  //shows one section and index of images
  .get(function(req,res){
    res.locals.section.getImages().then(function(images){
      res.json({
        section: {
          title: res.locals.section.title,
          overview: res.locals.section.overview,
          prose: res.locals.section.prose,
          images: images
        }
      })
    });
  })
  // creates image in section
  .post(function(req,res){
    models.Image.create({location: req.body.location,
                         SectionId: res.locals.section.id
    }).then(function(image){
        res.json(image);
      }, function(err){
        console.log(err);
    });
  })
  .patch(function(req,res){
    // updates db using req.body
    res.locals.section.update(req.body).then(function(section){
      res.json(section);
    }, function(err){
      res.sendStatus(500);
    });
  })
  .delete(function(req,res){
    res.locals.section.destroy().then(function(){
      res.send('section deleted');
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
