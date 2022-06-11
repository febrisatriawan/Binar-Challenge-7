const express = require('express');
const router = express();

router.get("/login", (req, res) => {
    res.render("login");   
});

router.get("/sign_up", (req, res) => {
    res.render("sign_up");  
});

router.get("/games", (req, res) => {
    const name = req.query.name || 'PLAYER 1'
    res.render('games', {
        name
    });
});

module.exports = router;