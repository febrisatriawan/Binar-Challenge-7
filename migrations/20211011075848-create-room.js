'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_room: {
        type: Sequelize.STRING,
      },
      id_player_1: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'user_games',
            schema: 'public',
          },
          key: 'id',
        },
      },
      id_player_2: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'user_games',
            schema: 'public',
          },
          key: 'id',
        },
      },
      move_player_1: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      move_player_2: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rooms');
  },
};
