const { getConnection } = require('typeorm');
const bcrypt = require('../../helpers/bcrypt');

module.exports = {
  async create(data) {
    const user = data;
    const userRepository = getConnection().getRepository('User');
    // Criptografa a senha
    const cryptoPass = bcrypt.encrypt(user.password, 10);
    user.password = cryptoPass;
    const result = await userRepository.save(user);
    delete result.password;
    return result;
  },

  async list(param) {
    const findArguments = { select: ['id', 'name', 'login'] };
    // Verifica se existe algum filtro para seleção
    if (param) { findArguments.where = param; }
    const userRepository = getConnection().getRepository('User');
    const result = await userRepository.find(findArguments);
    return result;
  },

  async getOne(param) {
    const userRepository = getConnection().getRepository('User');
    const result = await userRepository.findOne(param, { select: ['id', 'name', 'login'] });
    return result;
  },

  async update(id, data) {
    const user = data;
    const userRepository = getConnection().getRepository('User');
    // Criptografa a senha
    const cryptoPass = bcrypt.encrypt(user.password, 10);
    user.password = cryptoPass;
    await userRepository.update(id, user);
    const result = await userRepository.findOne(id);
    delete result.password;
    return result;
  },

  async delete(id) {
    const userRepository = getConnection().getRepository('User');
    const result = await userRepository.delete(id);
    return result;
  },
};
