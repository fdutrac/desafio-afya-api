const { createConnection, getRepository } = require('typeorm');
const bcrypt = require('bcrypt');

module.exports = {
  async create(data) {
    const connection = await createConnection();
    try {
      const user = data;
      const userRepository = getRepository('User');
      // Criptografa a senha
      const cryptoPass = bcrypt.hashSync(user.password, 10);
      user.password = cryptoPass;
      const result = await userRepository.save(user);
      delete result.password;
      return result;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.find(param);
      return result;
    } finally {
      connection.close();
    }
  },

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

  async update(id, data) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      await userRepository.update(id, data);
      const result = await userRepository.findOne(id);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
