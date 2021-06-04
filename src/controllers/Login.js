const bcrypt = require('bcrypt');
const userRepository = require('../services/Login');
const JwtToken = require('../helpers/jwtToken');

async function auth(req, res) {
  const { login, password } = req.body;
  try {
    const user = await userRepository.getOne({ login });

    if (user && bcrypt.compare(password, user.password)) {
      delete user.password;
      user.token = JwtToken.makeToken(user);
      return res.json(user);
    }
    return res.status(404).send({
      message: 'Login ou senha inválidos',
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = { auth };
