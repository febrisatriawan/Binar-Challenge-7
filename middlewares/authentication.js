const { user_game } = require('../models');
const { verifyToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      res.status(401).json({
        message: 'Please Login First',
      });
    } else {
      const decoded = verifyToken(access_token);
      req.loggedInUser = decoded;
      const user = await user_game.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (user) {
        next();
      } else {
        console.log(err);
        res.status(401).json({
          message: 'Please Login First',
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: 'Please Login Firsteff',
    });
  }
};
