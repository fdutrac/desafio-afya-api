const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async getOne(param) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const results = await userRepository.findOne(param);
      return results;
    } finally {
      connection.close();
    }
  },
};
