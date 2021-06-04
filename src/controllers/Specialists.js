const { getConnection } = require('typeorm');

/* GET Specialists listing. */
async function getAll(req, res) {
  try {
    const SpecialistRepository = getConnection().getRepository('Specialist');
    const allSpecialists = await SpecialistRepository.find({ relations: ['profession'] });
    res.json(allSpecialists);
  } catch (err) {
    res.json(err);
  }
}

async function getOne(req, res) {
  try {
    const SpecialistRepository = getConnection().getRepository('Specialist');
    const SpecialistData = await SpecialistRepository.findOne(req.params.id, { relations: ['profession'] });
    res.json(SpecialistData);
  } catch (err) {
    res.json(err);
  }
}
async function update(req, res) {
  try {
    const SpecialistRepository = getConnection().getRepository('Specialist');
    const SpecialistData = await SpecialistRepository.findOne(req.params.id);
    SpecialistRepository.merge(SpecialistData, req.body);
    const results = await SpecialistRepository.save(SpecialistData);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function insert(req, res) {
  try {
    const SpecialistRepository = getConnection().getRepository('Specialist');
    const results = await SpecialistRepository.save(req.body);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function remove(req, res) {
  try {
    const SpecialistRepository = getConnection().getRepository('Specialist');
    // const Specialist = SpecialistRepository.findOne(id);
    const results = SpecialistRepository.delete(req.params.id);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  getAll, getOne, insert, update, remove,
};
