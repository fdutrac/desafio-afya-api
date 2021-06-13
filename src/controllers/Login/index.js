const { validationResult } = require('express-validator');
const loginService = require('../../services/Login');

async function auth(req, res) {
  const { login, password } = req.body;
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const isAuth = await loginService.auth(login, password);
    if (isAuth.token) {
      return res.status(201).json(isAuth);
    }
    return res.status(401).json(isAuth);
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = { auth };
