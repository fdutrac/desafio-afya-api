const { compareSync } = require('bcrypt');
const UserRepository = require('./index');

describe('Cria usuário e encriptografa senha', () => {
  const User = {
    name: 'Teste de Criptografia',
    login: 'testelogin',
    password: '123456',
  };

  it('Deve criar um usuário novo', async () => {
    const createdUser = await UserRepository.create(User);
    expect(createdUser).toHaveProperty('id');
    User.id = createdUser.id;
  });

  it('Deve ter uma senha encriptografada', async () => {
    const createdUser = await UserRepository.getOne(User.id);
    User.password = '123456';
    expect(compareSync(User.password, createdUser.password)).toBe(true);
    await UserRepository.delete(createdUser.id);
  });
});
