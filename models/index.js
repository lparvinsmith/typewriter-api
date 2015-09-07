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
models.Section = sequelize.import('./section');
models.Image = sequelize.import('./image');

// associations
models.Story.belongsTo(models.User);
models.User.hasMany(models.Story);

models.Section.belongsTo(models.Story);
models.Story.hasMany(models.Section);

models.Image.belongsTo(models.Section);
models.Section.hasMany(models.Image);


module.exports = models;
