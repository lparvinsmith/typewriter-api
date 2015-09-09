var express = require('express');
var models = require('../models/index');
var router = express.Router();

// see routes/sections.js for index and create images
router.route('/:id')
  .all(function(req,res,next){
    // makes res.locals.image available to each of following handlers
    models.Image.findById(req.params.id).then(function(image){
      res.locals.image = image;
      next();
    }, function(err){
      next(err); //goes to fail handler in app, unless we set fail handler below with all
    });
  })
  .get(function(req,res){
    res.json(res.locals.image);
  })
  .delete(function(req,res){
    res.locals.image.destroy().then(function(){
      res.send('image deleted');
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
