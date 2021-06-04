const userRepository = require('../services/Users');

async function get(req, res) {
  try {
    const param = req.body;
    const result = await userRepository.list(param);
    return (result.length >= 1 ? res.json(result) : res.status(204).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const param = req.body;
    const result = await userRepository.getOne(param);
    return (result.length >= 1 ? res.json(result) : res.status(204).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const result = await userRepository.update(req.params.id, req.body);
    return res.json(result);
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
    const result = await userRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
