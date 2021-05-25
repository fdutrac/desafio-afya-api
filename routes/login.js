const express = require('express');
const router = express.Router();
const JwtToken = require('../helpers/jwtToken');
const userController = require('../controllers/Users');

/* Validate and generate token */

router.post('/', async function(req, res, next) {
  const {login, password} = req.body;
  let user = await userController.validateUser(login, password);
  if(user) {
    user.password = undefined;
    console.log ('jwt');
      user.token = JwtToken.fabricaToken(user)
    res.json(user);
    return;
  }
  res.send({
    mensagem: "Login ou senha inválidos"
  })
});

module.exports = router;
