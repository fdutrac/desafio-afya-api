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

  async list() {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.find();
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
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
