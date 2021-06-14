const { getConnection } = require('typeorm');

module.exports = {
  async create(data) {
    const medRecordHistories = getConnection().getRepository('MedicalRecordHistory');
    const result = await medRecordHistories.save(data);
    return result;
  },

  async list() {
    const medRecordHistories = getConnection().getRepository('MedicalRecordHistory');
    const result = await medRecordHistories.find({ relations: ['specialist', 'medicalRecord'] });
    return result;
  },

  async getOne(param) {
    const medRecordHistories = getConnection().getRepository('MedicalRecordHistory');
    const result = await medRecordHistories.findOne(param, { relations: ['specialist', 'medicalRecord'] });
    return result;
  },

  async update(id, data) {
    const medRecordHistories = getConnection().getRepository('MedicalRecordHistory');
    await medRecordHistories.update(id, data);
    const result = await medRecordHistories.findOne(id, { relations: ['specialist', 'medicalRecord'] });
    return result;
  },

  async delete(id) {
    const medRecordHistories = getConnection().getRepository('MedicalRecordHistory');
    const result = await medRecordHistories.delete(id);
    return result;
  },
};
