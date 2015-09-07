var Sequelize = require('sequelize');

var sequelize = new Sequelize('typewriter', 'typewriter_user', 'pass', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

// create models object with methods sequelize and constructor functions
var models = {};
models.sequelize = sequelize;
models.User = sequelize.import('./user');
models.Story = sequelize.import('./story');

// associations
models.Story.belongsTo(models.User);
models.User.hasMany(models.Story);

module.exports = models;
