module.exports = {
  index: (req, res) => {
    console.log(req.loggedInUser, '<<< ini dari game');
    res.render('game');
  },
};
