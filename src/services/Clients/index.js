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
      const result = await clientRepository.findOne(id, { relations: ['address'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();

    try {
      const findArguments = { relations: ['address'] };
      // Verifica se existe algum filtro para seleção
      if (param) { findArguments.where = param; }
      const clientRepository = getRepository('Client');
      const result = await clientRepository.find(findArguments);
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const clientToUpdate = await clientRepository.findOne(id, { relations: ['address'] });
      clientRepository.merge(clientToUpdate, data);
      const result = await clientRepository.save(clientToUpdate);
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
