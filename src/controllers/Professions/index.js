const professionsRepository = require('../../services/Professions');

/* GET Profession listing. */
async function get(req, res) {
  try {
    const result = await professionsRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const result = await professionsRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const result = await professionsRepository.create(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = await professionsRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.json(err);
  }
}

module.exports = {
  get, insert, update, remove,
};
