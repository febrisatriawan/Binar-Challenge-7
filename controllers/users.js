const { user_game, user_game_biodata, user_game_history } = require ('../models');

module.exports = {
    index: (req,res)=>{
        user_game.findAll()
        .then((users)=>{
            res.render ('users/index', {
                users
            })
        })
    },

    //done
    create: (req,res)=>{
        res.render('users/create')
    },
    //post method: showing new data that are created
    new: (req,res)=> {
        user_game.create({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            user_game_biodata:{
                nama: req.body.nama
            }
        }, { 
            include: {
                model:user_game_biodata,
                as: 'user_game_biodata'
            }
        })
   
        .then(()=>{
            res.redirect('/users')
        })
    },

    //done
    detail: (req,res)=>{
        user_game.findOne({
            where: {id: req.params.id},
            include: {
                model: user_game_biodata,
                as: 'user_game_biodata'
            }
        })
        .then((data)=>{
            res.render('users/detail', {data})
        })
    },
    //done
    destruct: (req,res)=>{
        user_game_biodata.destroy({ where: {user_id: req.params.id}})
        .then(()=>{
            user_game.destroy({ where: {id: req.params.id} })
            // res.send('data user berhasil dihapus')
            res.redirect('/users')
        })
    },
    //done
    formupdate: (req,res)=>{
        user_game.findOne({
            where: {id: req.params.id},
        include: {
            model:user_game_biodata,
            as: 'user_game_biodata'
        }
        })
        .then((data)=>{
            res.render('users/update', {data})
        })
    },

    //post need to change
    makeupdate: (req,res)=>{
        user_game.update({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        }  
        ,{where: {id:req.params.id}
    })
    .then(()=>{
        user_game_biodata.update({
            nama: req.body.nama,
        }, 
            {where: {user_id: req.params.id} })
        res.redirect('/users')
        })
    }
}