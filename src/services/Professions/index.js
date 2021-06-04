const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(profession) {
    const connection = await createConnection();
    try {
      const professionRepository = getRepository('Profession');
      const result = await professionRepository.save(profession);
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(id) {
    const connection = await createConnection();
    try {
      const professionRepository = getRepository('Profession');
      const result = await professionRepository.findOne(id);
      return result;
    } finally {
      connection.close();
    }
  },

  async list() {
    const connection = await createConnection();
    try {
      const professionRepository = getRepository('Profession');
      const result = await professionRepository.find();
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const professionRepository = getRepository('Profession');
      const profession = await professionRepository.findOne(id);
      professionRepository.merge(profession, data);
      const result = await professionRepository.save(profession);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const professionRepository = getRepository('Profession');
      const result = await professionRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
