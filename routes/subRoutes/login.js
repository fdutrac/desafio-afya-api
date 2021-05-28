const express = require('express');
const router = express.Router();
const JwtToken = require('../../helpers/jwtToken');
const Controllers = require('../../controllers/index');

/* Validate and generate token */

router.post('/', async function(req, res, next) {
  const {login, password} = req.body;
  let user = await Controllers.Users.validate(login, password);
  if(user) {
    user.password = undefined;
    user.token = JwtToken.fabricaToken(user)
    res.json(user);
    return;
  }
  res.send({
    mensagem: "Login ou senha inválidos"
  })
});

module.exports = router;
