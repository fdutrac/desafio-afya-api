const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(specialist) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      const result = await specialistRepository.save(specialist);
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(id) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      const result = await specialistRepository.findOne(id, { relations: ['address', 'profession'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();
    const findArguments = { relations: ['address', 'profession'] };
    try {
      // Verifica se existe algum parâmetro para seleção
      if (param) { findArguments.where = param; }
      const specialistRepository = getRepository('Specialist');
      const result = await specialistRepository.find(findArguments);
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      await specialistRepository.update(id, data);
      const result = await specialistRepository.findOne(id, { relations: ['address', 'profession'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      const result = await specialistRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
