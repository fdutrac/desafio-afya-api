const { createConnection, getRepository } = require('typeorm');
const bcrypt = require('../../helpers/bcrypt');

module.exports = {
  async create(data) {
    const connection = await createConnection();
    try {
      const user = data;
      const userRepository = getRepository('User');
      // Criptografa a senha
      const cryptoPass = bcrypt.encrypt(user.password, 10);
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
      const findArguments = { select: ['id', 'name', 'login'] };
      // Verifica se existe algum filtro para seleção
      if (param) { findArguments.where = param; }
      const userRepository = getRepository('User');
      const result = await userRepository.find(findArguments);
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(param) {
    const connection = await createConnection();
    try {
      const userRepository = getRepository('User');
      const result = await userRepository.findOne(param, { select: ['id', 'name', 'login'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    const user = data;
    try {
      const userRepository = getRepository('User');
      // Criptografa a senha
      const cryptoPass = bcrypt.hashSync(user.password, 10);
      user.password = cryptoPass;
      await userRepository.update(id, user);
      const result = await userRepository.findOne(id);
      delete result.password;
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
