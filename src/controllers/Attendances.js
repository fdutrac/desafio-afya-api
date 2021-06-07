const attendancesRepository = require('../services/Attendances');

async function get(req, res) {
  try {
    const result = await attendancesRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const result = await attendancesRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const result = await attendancesRepository.create(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = await attendancesRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(204).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, insert, update, remove,
};
