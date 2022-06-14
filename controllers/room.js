const sequelize = require('sequelize');
const { room } = require('../models');

module.exports = {
  index: (req, res) => {
    room.findAll().then((room) => {
      res.render('room/viewRoom', {
        room,
      });
    });
  },
  destruct: (req, res) => {
    room.destroy({ where: { id: req.params.id } }).then(() => {
      room.destroy({ where: { id: req.params.id } });
      // res.send('data user berhasil dihapus')
      res.redirect('/room');
    });
  },

  // create new room
  create: (req, res) => {
    room
      .create({
        nama_room: req.body.nama_room,
        id_player_1: req.loggedInUser.id,
      })
      .then((room) => {
        res.json(room);
      });
  },

  // fight player 1 vs player 2

  fight: (req, res) => {
    const { id_player_2, move_player_1, move_player_2 } = req.body;
    const userId = req.loggedInUser.id;

    room
      .findOne({ where: { id: req.params.id } })
      .then((resultFindOne) => {
        const resultFindOneUser1 = resultFindOne.dataValues.move_player_1;
        const resultFindOneUser2 = resultFindOne.dataValues.move_player_2;

        if (resultFindOneUser2 === null || resultFindOneUser2.length < 3) {
          if (userId % 2 === 0) {
            room
              .update(
                {
                  id_player_2: userId,
                  move_player_2: sequelize.fn(
                    'array_append',
                    sequelize.col('move_player_2'),
                    move_player_2,
                  ),
                },
                { where: { id: req.params.id }, returning: true },
              )
              .then((updateRoom) => {
                res.status(200).json({
                  message: 'update successfully',
                  updateRoom,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else if (
          resultFindOneUser1 === null
          || resultFindOneUser1.length < 3
        ) {
          if (userId % 2 !== 0) {
            room
              .update(
                {
                  move_player_1: sequelize.fn(
                    'array_append',
                    sequelize.col('move_player_1'),
                    move_player_1,
                  ),
                },
                { where: { id: req.params.id }, returning: true },
              )
              .then((result) => {
                const arrUser1 = result[1][0].dataValues.move_player_1;
                const arrUser2 = result[1][0].dataValues.move_player_2;

                const finalResultarr = [];
                const finalResult = '';

                if (arrUser1.length > 3) {
                  arrUser1.length = 3;
                }

                console.log('ini arrUser1', arrUser1);

                //   if (arrUser1[0] === 'rock' && arrUser2[0] === 'rock') {
                //     finalResult = 'draw';
                //     finalResultarr.push(finalResult);
                //   }
                //   console.log('dari final result', finalResultarr);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
