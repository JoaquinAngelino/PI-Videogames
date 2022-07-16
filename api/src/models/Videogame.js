const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released:{
      type: DataTypes.DATEONLY
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true
    },
    platforms:{
      type: DataTypes.JSON,
    },
  },
  {timestamps: false});
};
