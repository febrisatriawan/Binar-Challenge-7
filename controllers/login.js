let data = require('../db/database.json')
const { user_game, user_game_biodata, user_game_history } = require ('../models');


module.exports = {
    
    index: (req,res)=>{
        res.render('login')
    },
    auth: (req,res)=>{
        if(user_game.findOne({
            where: {username: req.body.username},
        })) {
            res.send ("benar")
        }
        else {
            res.send('salah')
        }
    }
}