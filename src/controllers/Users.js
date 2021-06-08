const { validationResult } = require('express-validator');
const userRepository = require('../services/Users');

async function get(req, res) {
  try {
    const result = await userRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const result = await userRepository.getOne(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }
    const result = await userRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }
    const user = req.body;
    const result = await userRepository.create(user);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(404).json(validationErrors.array());
    }
    const result = await userRepository.delete(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
