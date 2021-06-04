const userRepository = require('../services/Users');

async function get(req, res) {
  try {
    const param = req.body;
    const results = await userRepository.list(param);
    return (results.length >= 1 ? res.json(results) : res.status(204).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const results = await userRepository.update(req.params.id, req.body);
    return res.json(results);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const user = req.body;
    const result = await userRepository.create(user);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const results = await userRepository.delete(req.params.id);
    return (results.affected ? res.status(200).json(results) : res.status(404).json(results));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, insert, update, remove,
};
