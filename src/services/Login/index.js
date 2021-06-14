const { createConnection, getRepository } = require('typeorm');
const JwtToken = require('../../helpers/jwtToken');
const bcrypt = require('../../helpers/bcrypt');

module.exports = {
  async auth(login, password) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.findOne(param);
      return result;
    } finally {
      connection.close();
    }
  },
};
