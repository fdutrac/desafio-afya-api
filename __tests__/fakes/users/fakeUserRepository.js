const {v4: uuidv4} = require('uuid');

let EntitySchema = require("typeorm").EntitySchema;

class FakeUserRepository {
  users = [];

  async findByID(id) {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  async findBylogin(login){
    const findUser = this.users.find(login => user.login === login);

    return findUser;
  }

  async findAllSpecialists(except_user_id){
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  async create(name, login, password) {
    const checkUserExists = this.users.find(login => user.login === login)
    
    if (checkUserExists) {
      throw new Error('login already in use');
    }

    const user = new EntitySchema;

    Object.assign(user, { id: uuidv4() }, name, login, password);

    this.users.push(user);

    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

module.exports = FakeUserRepository;
