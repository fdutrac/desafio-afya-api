const specialistRepository = require('../services/Specialists');

async function get(req, res) {
  try {
    const results = await specialistRepository.list(req.body);
    return (results.length >= 1 ? res.json(results) : res.status(204).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function getById(req, res) {
  try {
    const result = await specialistRepository.getOne(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function update(req, res) {
  try {
    const result = await specialistRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const specialist = req.body;
    const result = await specialistRepository.create(specialist);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const results = await specialistRepository.delete(req.params.id);
    return (results.affected ? res.status(200).json(results) : res.status(404).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getById, insert, update, remove,
};
