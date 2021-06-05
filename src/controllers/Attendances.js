const attendancesRepository = require('../services/Attendances');

async function get(req, res) {
  try {
    const result = await attendancesRepository.list(req.body);
    return (result.length >= 1 ? res.json(result) : res.json('Nenhum atendimento encontrado!'));
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const result = await attendancesRepository.update(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    const result = await attendancesRepository.save(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    const result = attendancesRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, insert, update, remove,
};
