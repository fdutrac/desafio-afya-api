const clientRepository = require('../services/Users');

async function get(req, res) {
  try {
    const results = await clientRepository.list(req.body);
    return (results.length >= 1 ? res.json(results) : res.status(204).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function getById(req, res) {
  try {
    const result = await clientRepository.getOne(req.params.id);
    return res.json(result);
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
    const result = await clientRepository.create(client);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const results = await clientRepository.delete(req.params.id);
    return (results.affected ? res.status(200).json(results) : res.status(404).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getById, insert, update, remove,
};
