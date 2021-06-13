const { createConnection, getRepository } = require('typeorm');
const JwtToken = require('../../helpers/jwtToken');
const bcrypt = require('../../helpers/bcrypt');

module.exports = {
  async auth(login, password) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const user = await userRepository.findOne({ login });
      if (user && bcrypt.compare(password, user.password)) {
        delete user.password;
        user.token = JwtToken.makeToken(user);
        return user;
      }
      return 'Usuário não autenticado.';
    } finally {
      connection.close();
    }
  },
};
