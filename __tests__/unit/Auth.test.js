const jwt = require('jsonwebtoken');
require('dotenv/config');
const JwtToken = require('../src/helpers/jwtToken');
const environment = require('../src/config/environment/jwt');

describe('Verify if JWT is working', () => {
  const User = {
    id: 1,
    login: 'zezinho123',
  };

  it('should generate a new jwt token', () => {
    const token = JwtToken.makeToken(User);
    expect(jwt.verify(token, environment.jwt.user.secret).id).toBe(User.id);
  });
});
