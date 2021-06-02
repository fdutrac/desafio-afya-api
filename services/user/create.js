const { getConnection } = require('typeorm');

module.exports = async function create(userRepository, user) {        
    // Criptografa a senha
    const cryptoPass = bcrypt.hashSync(user.password, 10);
    user.password = cryptoPass;
    const results = await userRepository.save(user);
    delete results.password;    
    return results;  
}

