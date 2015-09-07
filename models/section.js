module.exports = function(sequelize, Datatypes){

  var Section = sequelize.define('Section', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    title: {
      type: Datatypes.STRING,
      allowNull: false
    },

    overview: {
      type: Datatypes.TEXT,
      allowNull: true
    },

    prose: {
      type: Datatypes.TEXT,
      allowNull: true
    }

  }, {
    timestamps: true

  });

  return Section;
};
