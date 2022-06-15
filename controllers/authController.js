const { user_game } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
  static register(req, res) {
    const { username, password, role } = req.body;

    user_game
      .create({ username, password, role })
      .then((user) => {
        const response = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await user_game.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: 'Invalid username or Password',
        });
      }

      const match = comparePassword(password, user.password);

      if (match) {
        const payload = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
        const access_token = generateToken(payload);
        return res.status(200).json({
          access_token: access_token,
        });
      } else {
        return res.status(401).json({
          message: 'Invalid email or password',
        });
      }
    } catch (err) {
      return res.status(401).json(err);
    }
  }
}

module.exports = AuthController;
