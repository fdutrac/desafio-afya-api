const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async getOne(param) {
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
