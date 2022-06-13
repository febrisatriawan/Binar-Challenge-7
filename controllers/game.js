module.exports = {
    index: (req, res) => {
      console.log(req.loggedInUser, '<< play games');
      res.render('game');
    },
  };
  