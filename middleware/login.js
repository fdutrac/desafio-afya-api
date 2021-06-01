const jwt = require('jsonwebtoken');
const environment = require('../config/environment/dev');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Usuário não autenticado.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Usuário não autenticado.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Usuário não autenticado.' });
  }
  try {
    jwt.verify(token, environment.jwt.user.secret);
    return next();
  } catch (err) {
    return res.status(401).send({ error: 'Usuário não autenticado.' });
  }
};
