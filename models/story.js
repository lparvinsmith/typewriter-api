module.exports = function(sequelize, Datatypes){

  var Story = sequelize.define('Story', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    title: {
      type: Datatypes.STRING,
      allowNull: false
    }

  }, {
    timestamps: true

  });

  return Story;
};
