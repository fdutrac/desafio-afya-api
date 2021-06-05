const medicalRecordsRepository = require('../services/MedicalRecords');

/* GET MedicalRecord listing. */
async function get(req, res) {
  try {
    const result = await medicalRecordsRepository.list();
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const result = await medicalRecordsRepository.getByName(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function update(req, res) {
  try {
    const result = await medicalRecordsRepository.update(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const result = await medicalRecordsRepository.create(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = medicalRecordsRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
