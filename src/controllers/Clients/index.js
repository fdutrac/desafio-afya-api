const { validationResult } = require('express-validator');

const clientRepository = require('../../services/Clients');

async function get(req, res) {
  try {
    const result = await clientRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function getOne(req, res) {
  try {
    const result = await clientRepository.getOne(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function update(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const result = await clientRepository.update(req.params.id, req.body);
    return result ? res.json(result) : res.status(404).json(`
      Cliente com ID ${req.params.id} não existe!
      `);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const client = req.body;
    const result = await clientRepository.create(client);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(404).json(validationErrors.array());
    }

    const result = await clientRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getOne, insert, update, remove,
};
