'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room.init(
    {
      nama_room: DataTypes.STRING,
      id_player_1: DataTypes.INTEGER,
      id_player_2: DataTypes.INTEGER,
      move_player_1: DataTypes.ARRAY(DataTypes.STRING),
      move_player_2: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'room',
      hooks: {
        beforeUpdate: (instance, options) => {
          console.log(instance._previousDataValues);
        },
      },
    }
  );
  return room;
};
