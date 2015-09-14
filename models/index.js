var Sequelize = require('sequelize');

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  // the application is executed on Heroku ... use the postgres database
  var sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3]
  });

} else {
  var sequelize = new Sequelize(process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASS,

    {
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      dialect: 'postgres'
    }
  );
};

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
