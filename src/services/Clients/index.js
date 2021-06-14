const { getConnection } = require('typeorm');

module.exports = {
  async create(client) {
    const clientRepository = getConnection().getRepository('Client');
    // Cria novo usuário
    const newClient = await clientRepository.save(client);
    // Cria novo prontuário
    const medRecordRepository = getConnection().getRepository('MedicalRecord');
    const createdMedRecord = await medRecordRepository.save({ client: newClient.id }, { relations: ['client'] });
    const medRecord = { medicalRecord: createdMedRecord.id };
    // Atribui prontuário ao cliente
    await clientRepository.update(newClient.id, medRecord);
    const result = await clientRepository.findOne(newClient.id, { relations: ['address', 'medicalRecord'] });
    return result;
  },

  async getOne(id) {
    const clientRepository = getConnection().getRepository('Client');
    const result = await clientRepository.findOne(id, { relations: ['address', 'medicalRecord'] });
    return result;
  },

  async list(param) {
    const findArguments = { relations: ['address', 'medicalRecord'] };
    // Verifica se existe algum filtro para seleção
    if (param) { findArguments.where = param; }
    const clientRepository = getConnection().getRepository('Client');
    const result = await clientRepository.find(findArguments);
    return result;
  },

  async update(id, data) {
    const clientRepository = getConnection().getRepository('Client');
    const clientToUpdate = await clientRepository.findOne(id, { relations: ['address'] });
    clientRepository.merge(clientToUpdate, data);
    const result = await clientRepository.save(clientToUpdate);
    return result;
  },

  async delete(id) {
    const clientRepository = getConnection().getRepository('Client');
    const result = await clientRepository.delete(id);
    return result;
  },
};
