const uuid = require('uuid');

// import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository {
  userTokens = [];

  async generate(user_id) {
    const userToken = new UserToken();

    Object.assign(UserToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token) {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

module.exports = FakeUserTokensRepository;
