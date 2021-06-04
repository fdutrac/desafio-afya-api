const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(client) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const result = await clientRepository.save(client);
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(id) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const results = await clientRepository.findOne(id, { relations: ['address'] });
      return results;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const results = await clientRepository.find(param, { relations: ['address'] });
      return results;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const client = await clientRepository.findOne(id, { relations: ['address'] });
      clientRepository.merge(client, data);
      const result = await clientRepository.save(client);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const result = await clientRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
