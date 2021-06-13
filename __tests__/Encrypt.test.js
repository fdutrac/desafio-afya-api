const bcrypt = require('../src/helpers/bcrypt');

describe('Define User and encypt password', () => {
  it('Should have encrypted password', () => {
    const User = {
      name: 'Teste de Criptografia',
      login: 'testelogin',
      password: '123456',
    };
    // const createdUser = await UserRepository.create(User);
    const ecryptedPass = bcrypt.encrypt(User.password);
    expect(bcrypt.compare(User.password, ecryptedPass)).toBe(true);
  });
});
