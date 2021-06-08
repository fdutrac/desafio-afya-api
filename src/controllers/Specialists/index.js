const specialistRepository = require('../../services/Specialists');

async function get(req, res) {
  try {
    const result = await specialistRepository.list(req.query);
    return res.json(result);
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
    const result = await specialistRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getById, insert, update, remove,
};
