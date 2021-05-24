
/* GET users listing. */
const getConnection = require('typeorm').getConnection

async function getUsers() {
    console.log(getConnection().getRepository("User"))
    try {
        const userRepository = getConnection().getRepository("User");        
        const allUsers = await userRepository.find();
        return allUsers;
    } catch (err) {
        return err;
    }
}

async function getUser(id) {
    try {
        const userRepository = getConnection().getRepository("User");        
        const userData = await userRepository.findOne(id);
        return userData;
    } catch (err) {
        return err;
    }
}
async function updateUser(id, data) {
    try {
        const userRepository = getConnection().getRepository("User");        
        const userData = await userRepository.findOne(id);
        userRepository.merge(userData, data);
        const results = await userRepository.save(userData);
        return results;
    } catch (err) {
        return err;
    }
}

async function insertUser(data) {
    try {
        const userRepository = getConnection().getRepository("User");               
        const results = await userRepository.save(data);
        return results;
    } catch (err) {
        return err;
    }
}

async function deleteUser(id) {
    try {
        const userRepository = getConnection().getRepository("User");
        // const user = userRepository.findOne(id);
        const results = userRepository.delete(id);
        return results;           
    } catch (err) {
        return err;
    }
}
module.exports = { getUsers, getUser, insertUser, updateUser, deleteUser }