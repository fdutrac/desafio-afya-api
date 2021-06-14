const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(client) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      // Cria novo usuário
      const newClient = await clientRepository.save(client);
      // Cria novo prontuário
      const medRecordRepository = getRepository('MedicalRecord');
      const createdMedRecord = await medRecordRepository.save({ client: newClient.id }, { relations: ['client'] });
      const medRecord = { medicalRecord: createdMedRecord.id };
      // Atribui prontuário ao cliente
      await clientRepository.update(newClient.id, medRecord);
      const result = await clientRepository.findOne(newClient.id, { relations: ['address', 'medicalRecord'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(id) {
    const connection = await createConnection();
    try {
      const clientRepository = getRepository('Client');
      const result = await clientRepository.findOne(id, { relations: ['address', 'medicalRecord'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();

    try {
      const findArguments = { relations: ['address', 'medicalRecord'] };
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
