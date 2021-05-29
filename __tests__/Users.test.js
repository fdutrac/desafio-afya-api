let FakeUserRepository = require('./fakes/users/fakeUserRepository');

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();    
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUserRepository.create({
      name: 'Maria Jose',
      login: 'mariajose@example.com',
      password: 'mj123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same login from another', async () => {
    await fakeUserRepository.create({
      name: 'Maria Jose',
      login: 'mariajose7686',
      password: 'mj123456',
    });

    await expect(
      fakeUserRepository.create({
      name: 'Maria Jose',
      login: 'mariajose7686',
      password: 'mj123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
