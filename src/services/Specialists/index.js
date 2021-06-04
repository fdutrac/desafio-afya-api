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
      const results = await specialistRepository.findOne(id, { relations: ['address'] });
      return results;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      const results = await specialistRepository.find(param, { relations: ['address'] });
      return results;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const specialistRepository = getRepository('Specialist');
      const specialist = await specialistRepository.findOne(id, { relations: ['address'] });
      specialistRepository.merge(specialist, data);
      const result = await specialistRepository.save(specialist);
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
