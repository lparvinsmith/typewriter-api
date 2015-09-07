var Sequelize = require('sequelize');

var sequelize = new Sequelize('typewriter', 'typewriter_user', 'pass', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

var models = {};

models.sequelize = sequelize;

module.exports = models;
