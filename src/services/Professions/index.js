const { getConnection } = require('typeorm');

module.exports = {
  async create(profession) {
    const professionRepository = await getConnection().getRepository('Profession');
    const result = await professionRepository.save(profession);
    return result;
  },

  async getOne(id) {
    const professionRepository = await getConnection().getRepository('Profession');
    const result = await professionRepository.findOne(id);
    return result;
  },

  async list(param) {
    const professionRepository = await getConnection().getRepository('Profession');
    const result = await professionRepository.find({ where: param });
    return result;
  },

  async update(id, data) {
    const professionRepository = await getConnection().getRepository('Profession');
    await professionRepository.update(id, data);
    const result = await professionRepository.findOne(id);
    return result;
  },

  async delete(id) {
    const professionRepository = await getConnection().getRepository('Profession');
    const result = await professionRepository.delete(id);
    return result;
  },
};
