const clientRepository = require('../services/Clients');
const medicalRecordsRepository = require('../services/MedicalRecords');

async function get(req, res) {
  try {
    const result = await clientRepository.list(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function getById(req, res) {
  try {
    const result = await clientRepository.getOne(req.params.id);
    return (result.length === 1 ? res.json(result) : res.json('Nenhum cliente encontrado!'));
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function update(req, res) {
  try {
    const result = await clientRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const client = req.body;
    const clientResult = await clientRepository.create(client);
    const medRecordResult = await medicalRecordsRepository.create({ client: clientResult.id });
    const result = { clientResult, medRecordResult };
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = await clientRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getById, insert, update, remove,
};
