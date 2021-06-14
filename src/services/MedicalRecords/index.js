const { getConnection } = require('typeorm');

module.exports = {
  async create(data) {
    const medicalRecordsRepository = getConnection().getRepository('MedicalRecord');
    const result = await medicalRecordsRepository.save(data, { relations: ['client'] });
    return result;
  },

  async list() {
    const medicalRecordsRepository = getConnection().getRepository('MedicalRecord');
    const result = await medicalRecordsRepository.find({ relations: ['client'] });
    return result;
  },

  async getOne(param) {
    const medicalRecordsRepository = getConnection().getRepository('MedicalRecord');
    const result = await medicalRecordsRepository.findOne(param, { relations: ['client'] });
    const medRecordHistoriesRepository = getConnection().getRepository('MedicalRecordHistory');
    result.histories = await medRecordHistoriesRepository.find({
      where: { medicalRecord: result.id },
    });
    return result;
  },

  async update(id, data) {
    const medicalRecordsRepository = getConnection().getRepository('MedicalRecord');
    await medicalRecordsRepository.update(id, data);
    const result = await medicalRecordsRepository.findOne(id, { relations: ['client', 'medicalRecordHistories'] });
    return result;
  },

  async delete(id) {
    const medicalRecordsRepository = getConnection().getRepository('MedicalRecord');
    const result = await medicalRecordsRepository.delete(id);
    return result;
  },
};
