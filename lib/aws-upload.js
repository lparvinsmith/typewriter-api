'use strict';

var bucket = process.env.AWS_S3_BUCKET ||
 require('dotenv').load() && process.env.AWS_S3_BUCKET;
var util = require('util');
var crypto = require('crypto');
var fs = require('fs');
var AWS = require('aws-sdk');
var getFileType = require('file-type');

var models = require('../models/index');

var awsS3 = new AWS.S3();

var awsUpload = function(buffer, SectionId, callback) {
  var fileType = getFileType(buffer);

  if (!fileType) {
    fileType = {
      ext: 'bin',
      mime: 'application/octet-stream'
    };
  }

  var key = util.format('%s/%s.%s',
    (new Date()).toISOString().split('T')[0],
    crypto.pseudoRandomBytes(16).toString('hex'),
    fileType.ext);

  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    ContentType: fileType.mime,
    Body: buffer
  };

  awsS3.upload(params, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    // change to use promise? like in other routes methods
    models.Image.create({
      location: data.Location,
      SectionId: SectionId
    }).then(function(image){
        console.log(image);
        callback(err, image);
      }, callback);
  });
};

module.exports = awsUpload;
