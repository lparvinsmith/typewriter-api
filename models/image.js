module.exports = function(sequelize, Datatypes){

  var Image = sequelize.define('Image', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    location: {
      type: Datatypes.STRING,
      allowNull: false
    }

  }, {
    timestamps: true

  });

  return Image;
};
