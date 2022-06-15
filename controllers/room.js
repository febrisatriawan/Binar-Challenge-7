const { room } = require('../models');
const sequelize = require('sequelize');

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

  //menciptakan room baru
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

  //fight 2 player
  //   fight: (req, res) => {
  //     room
  //   .findOne({
  //     where: { id: req.params.id },
  //   })
  //   .then((roomfind) => {
  //     res.json(roomfind);
  //   })

  //   .then((firstMove) => {
  //if(!req.user.id === req.body.id_player_1){
  // room.update(
  //   {
  //     id_player_2: req.user.id,
  //     move_player_2: sequelize.fn(
  //       'array_append',
  //       sequelize.col('move_player_2'),
  //       req.body.move_player_2
  //     ),
  //     //move_player_2: req.body.move_player_2,
  //   },
  //   { where: { id: req.params.id } }
  // );
  // res.json(firstMove);

  //}
  //else {
  //res.send("kamu player 1 cari player 2")
  //}
  //   })

  //   .then((secondMove) => {
  //     room.update(
  //       {
  //         id_player_1: req.user.id,
  //         move_player_1: sequelize.fn(
  //           'array_append',
  //           sequelize.col('move_player_1'),
  //           req.body.move_player_1
  //         ),
  //       },
  //       { where: { id: req.params.id } }
  //     );
  //     res.json(secondMove);
  //   })

  //   .then((compare) => {
  //     if (
  //       (JSON.stringify(move_player_1) == 'rock' &&
  //         JSON.stringify(move_player_2) == 'scissors') ||
  //       (JSON.stringify(move_player_1) == 'paper' &&
  //         JSON.stringify(move_player_2) == 'rock') ||
  //       (JSON.stringify(move_player_1) == 'scissors' &&
  //         JSON.stringify(move_player_2) == 'paper')
  //     ) {
  //       user_game_history
  //         .create(
  //           {
  //             result: 'win',
  //           },
  //           { where: { user_id: room.id_player_1 } }
  //         )

  //         .then((result) => {
  //           user_game_history.create(
  //             {
  //               result: 'lose',
  //             },
  //             { where: { user_id: room.id_player_2 } }
  //           );
  //           res.json(result);
  //         });
  //     } else if (
  //       (JSON.stringify(move_player_1) == 'rock' &&
  //         JSON.stringify(move_player_2) == 'paper') ||
  //       (JSON.stringify(move_player_1) == 'paper' &&
  //         JSON.stringify(move_player_2) == 'scissors') ||
  //       (JSON.stringify(move_player_1) == 'scissors' &&
  //         JSON.stringify(move_player_2) == 'rock')
  //     ) {
  //       user_game_history
  //         .create(
  //           {
  //             result: 'Lose',
  //           },
  //           { where: { user_id: room.id_player_1 } }
  //         )
  //         .then((result) => {
  //           user_game_history.create(
  //             {
  //               result: 'Win',
  //             },
  //             { where: { user_id: room.id_player_2 } }
  //           );
  //           res.json(result);
  //         });
  //     } else if (
  //       JSON.stringify(move_player_1) === JSON.stringify(move_player_2)
  //     ) {
  //       user_game_history
  //         .create(
  //           {
  //             result: 'Draw',
  //           },
  //           { where: { user_id: room.id_player_1 } }
  //         )

  //         .then((result) => {
  //           user_game_history.create(
  //             {
  //               result: 'Draw',
  //             },
  //             { where: { user_id: room.id_player_2 } }
  //           );
  //           res.json(result);
  //         });
  //     }
  //   });

  //fungsi komparasi
  //lakukan for loop yang didalamnya ada if function
  //User_game_history.create function untuk menciptakan tabel baru dan ngepush hasil ke field result({})
  //   },

  fight: (req, res) => {
    const { id_player_2, move_player_1, move_player_2 } = req.body;
    const userId = req.loggedInUser.id;

    room
      .findOne({ where: { id: req.params.id } })
      .then((resultFindOne) => {
        let resultFindOneUser1 = resultFindOne.dataValues.move_player_1;
        let resultFindOneUser2 = resultFindOne.dataValues.move_player_2;

        if (resultFindOneUser2 === null || resultFindOneUser2.length < 3) {
          if (userId % 2 === 0) {
            room
              .update(
                {
                  id_player_2: userId,
                  move_player_2: sequelize.fn(
                    'array_append',
                    sequelize.col('move_player_2'),
                    move_player_2
                  ),
                },
                { where: { id: req.params.id }, returning: true }
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
          resultFindOneUser1 === null ||
          resultFindOneUser1.length < 3
        ) {
          if (userId % 2 !== 0) {
            room
              .update(
                {
                  move_player_1: sequelize.fn(
                    'array_append',
                    sequelize.col('move_player_1'),
                    move_player_1
                  ),
                },
                { where: { id: req.params.id }, returning: true }
              )
              .then((result) => {
                let arrUser1 = result[1][0].dataValues.move_player_1;
                let arrUser2 = result[1][0].dataValues.move_player_2;

                let finalResultarr = [];
                let finalResult = '';

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
