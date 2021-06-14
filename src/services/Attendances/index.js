const { getConnection } = require('typeorm');

module.exports = {
  async create(attendance) {
    const attendancesRepository = getConnection().getRepository('Attendance');
    const result = await attendancesRepository.save(attendance);
    return result;
  },

  async list(param) {
    const findArguments = { relations: ['patient', 'specialist'] };
    // Verifica se existe algum filtro para seleção
    if (param) { findArguments.where = param; }
    const attendancesRepository = getConnection().getRepository('Attendance');
    const result = await attendancesRepository.find(findArguments);
    return result;
  },

  async getOne(id) {
    const attendancesRepository = getConnection().getRepository('Attendance');
    const result = await attendancesRepository.findOne(id, { relations: ['patient', 'specialist'] });
    return result;
  },

  async update(id, data) {
    const attendancesRepository = getConnection().getRepository('Attendance');
    await attendancesRepository.update(id, data);
    const result = await attendancesRepository.findOne(id, { relations: ['patient', 'specialist'] });
    return result;
  },

  async delete(id) {
    const attendancesRepository = getConnection().getRepository('Attendance');
    const result = await attendancesRepository.delete(id);
    return result;
  },
};
