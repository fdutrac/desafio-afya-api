const { getConnection } = require('typeorm');
const JwtToken = require('../../helpers/jwtToken');
const bcrypt = require('../../helpers/bcrypt');

module.exports = {
  async auth(login, password) {
    const userRepository = getConnection().getRepository('User');
    const user = await userRepository.findOne({ login });
    if (user && bcrypt.compare(password, user.password)) {
      delete user.password;
      user.token = JwtToken.makeToken(user);
      return user;
    }
    return 'Usuário não autenticado.';
  },
};
