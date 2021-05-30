const { getConnection } = require('typeorm');

const bcrypt = require('bcrypt');

async function getAll(req, res) {
  try {
    const userRepository = getConnection().getRepository('User');
    const allUsers = await userRepository.find();
    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
}

async function getOne(req, res) {
  try {
    const userRepository = getConnection().getRepository('User');
    const userData = await userRepository.findOne(req.params.id);
    res.json(userData);
  } catch (err) {
    res.json(err);
  }
}
async function update(req, res) {
  try {
    const userRepository = getConnection().getRepository('User');
    const userData = await userRepository.findOne(req.params.id);
    userRepository.merge(userData, req.body);
    const results = await userRepository.save(userData);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function insert(req, res) {
  try {
    const userRepository = getConnection().getRepository('User');
    const data = req.body;
    // Criptografa a senha
    const cryptoPass = bcrypt.hashSync(data.password, 10);

    data.password = cryptoPass;
    const results = await userRepository.save(data);
    delete results.password;
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

async function remove(req, res) {
  try {
    const userRepository = getConnection().getRepository('User');
    const results = userRepository.delete(req.params.id);
    res.json(results);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  getAll, getOne, insert, update, remove,
};
