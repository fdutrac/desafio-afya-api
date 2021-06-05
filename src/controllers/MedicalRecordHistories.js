const medRecordsRepository = require('../services/MedicalRecordHistories');

/* GET Medical_Record listing. */
async function get(req, res) {
  try {
    const result = await medRecordsRepository.list();
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const result = await medRecordsRepository.getOne(req.body);
    return (result.length === 1 ? res.json(result) : res.json('Nenhum histórico encontrado!'));
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const result = await medRecordsRepository.update(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const result = await medRecordsRepository.create(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = await medRecordsRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
