
/* GET users listing. */
const getConnection = require('typeorm').getConnection;
const bcrypt = require ('bcrypt');

async function getAll() {
    const userRepository = getConnection().getRepository("User");        
    const allUsers = await userRepository.find();
    return allUsers;
}

async function getOne(id) {
    const userRepository = getConnection().getRepository("User");        
    const userData = await userRepository.findOne(id);
    return userData;
}
async function update(id, data) {
    const userRepository = getConnection().getRepository("User");        
    const userData = await userRepository.findOne(id);
    userRepository.merge(userData, data);
    const results = await userRepository.save(userData);
    return results;
}

async function insert(data) {
    const userRepository = getConnection().getRepository("User");

    //Criptografa a senha
    const cryptoPass = bcrypt.hashSync(data.password, 10);

    data.password = cryptoPass;
    let results = await userRepository.save(data)
    delete results.password;
    return results;
}

async function remove(id) {
    const userRepository = getConnection().getRepository("User");
    // const user = userRepository.findOne(id);
    const results = userRepository.delete(id);
    return results;           
}

async function validate(login, password) {
    const userRepository = getConnection().getRepository("User");        
    const userData = await userRepository.findOne({login: login, password: password});
    return userData;
    // bcrypt.compare(password, hash, (err, res) => {
    //     if (err) {
    //       console.error(err)
    //       return
    
}

module.exports = { getAll, getOne, insert, update, remove, validate }