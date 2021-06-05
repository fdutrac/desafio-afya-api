const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(data) {
    const connection = await createConnection();
    try {
      const medicalRecordsRepository = getRepository('MedicalRecord');
      const result = await medicalRecordsRepository.save(data, { relations: ['client'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async list() {
    const connection = await createConnection();

    try {
      const medicalRecordsRepository = getRepository('MedicalRecord');
      const result = await medicalRecordsRepository.find({ relations: ['client'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async getByName(param) {
    const connection = await createConnection();

    try {
      const medicalRecordsRepository = getRepository('MedicalRecord');
      const result = await medicalRecordsRepository.findOne(param, { relations: ['client', 'medicalRecordHistories'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const medicalRecordsRepository = getRepository('MedicalRecord');
      const attendance = await medicalRecordsRepository.findOne(id, { relations: ['client', 'medicalRecordHistories'] });
      medicalRecordsRepository.merge(attendance, data);
      const result = await medicalRecordsRepository.save(attendance);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const medicalRecordsRepository = getRepository('MedicalRecord');
      const result = await medicalRecordsRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
