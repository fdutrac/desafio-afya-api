const getConnection = require('typeorm').getConnection;
const JwtToken = require('../helpers/jwtToken');
// const bcrypt = require ('bcrypt');

async function login(req, res) {
    const {login, password} = req.body;
    const userRepository = getConnection().getRepository("User");        
    const userValid = await userRepository.findOne({login: login, password: password});
    if (userValid) {
        userValid.password = undefined;
        userValid.token = JwtToken.fabricaToken(user)
        res.json(userValid);
    } else {
        res.send({
            mensagem: "Login ou senha inválidos"
        })
    }
    // bcrypt.compare(password, hash, (err, res) => {
    //     if (err) {
    //       console.error(err)
    //       return

}

module.exports = { login }