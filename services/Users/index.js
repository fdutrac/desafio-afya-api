const { createConnection, getRepository } = require('typeorm');
const bcrypt = require('bcrypt');

module.exports = {
  async create(data) {
    const user = data;
    const connection = await createConnection();
    const userRepository = getRepository('User');
    // Criptografa a senha
    const cryptoPass = bcrypt.hashSync(user.password, 10);
    user.password = cryptoPass;
    const result = await userRepository.save(user);
    connection.close();
    delete result.password;
    return result;
  },

  async list(param) {
    const connection = await createConnection();
    const userRepository = getRepository('User');
    const results = await userRepository.find(param);
    connection.close();
    return results;
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const user = await userRepository.findOne(id);
      userRepository.merge(user, data);
      const result = await userRepository.save(user);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    const userRepository = getRepository('User');
    const result = await userRepository.delete(id);
    console.log(result);
    connection.close();
    return result;
  },
};
