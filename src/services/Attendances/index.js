const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(attendance) {
    const connection = await createConnection();
    try {
      const attendancesRepository = getRepository('Attendance');
      const result = await attendancesRepository.save(attendance);
      return result;
    } finally {
      connection.close();
    }
  },

  async list(param) {
    const connection = await createConnection();

    try {
      const findArguments = { relations: ['patient', 'specialist'] };
      // Verifica se existe algum filtro para seleção
      if (param) { findArguments.where = param; }
      const attendancesRepository = getRepository('Attendance');
      const result = await attendancesRepository.find(findArguments);
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const attendancesRepository = getRepository('Attendance');
      const attendance = await attendancesRepository.findOne(id, { relations: ['patient', 'specialist'] });
      attendancesRepository.merge(attendance, data);
      const result = await attendancesRepository.save(attendance);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const attendancesRepository = getRepository('Attendance');
      const result = await attendancesRepository.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};
