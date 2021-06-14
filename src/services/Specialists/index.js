const { getConnection } = require('typeorm');

module.exports = {
  async create(specialist) {
    const specialistRepository = await getConnection().getRepository('Specialist');
    const result = await specialistRepository.save(specialist);
    return result;
  },

  async getOne(id) {
    const specialistRepository = await getConnection().getRepository('Specialist');
    const result = await specialistRepository.findOne(id, { relations: ['address', 'profession'] });
    return result;
  },

  async list(param) {
    const findArguments = { relations: ['address', 'profession'] };
    // Verifica se existe algum parâmetro para seleção
    if (param) { findArguments.where = param; }
    const specialistRepository = await getConnection().getRepository('Specialist');
    const result = await specialistRepository.find(findArguments);
    return result;
  },

  async update(id, data) {
    const specialistRepository = await getConnection().getRepository('Specialist');
    const professionToUpdate = { profession: data.profession };
    const specialistToUpdate = await specialistRepository.findOne(id, { relations: ['address', 'profession'] });
    specialistRepository.merge(specialistToUpdate, data);
    await specialistRepository.save(specialistToUpdate);
    await specialistRepository.update(id, professionToUpdate);
    const result = await specialistRepository.findOne(id, { relations: ['address', 'profession'] });
    return result;
  },

  async delete(id) {
    const specialistRepository = await getConnection().getRepository('Specialist');
    const result = await specialistRepository.delete(id);
    return result;
  },
};
