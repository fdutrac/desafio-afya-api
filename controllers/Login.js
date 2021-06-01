const { getConnection } = require('typeorm');
const bcrypt = require('bcrypt');
const JwtToken = require('../helpers/jwtToken');

async function auth(req, res) {
  const { login, password } = req.body;
  const userRepository = getConnection().getRepository('User');

  const user = await userRepository.findOne({ login });

  if (user && bcrypt.compare(password, user.password)) {
    delete user.password;
    user.token = JwtToken.fabricaToken(user);
    res.json(user);
  } else {
    res.send({
      mensagem: 'Login ou senha inválidos',
    });
  }
}

module.exports = { auth };
