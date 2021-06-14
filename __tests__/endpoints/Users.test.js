/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const auth = require('../../src/services/Login');
const startDB = require('../../src/database/connectDB');
const userRepository = require('../../src/services/Users');

let user;

jest.setTimeout(10000);
beforeAll(async () => {
  await startDB();

  const testUser = await userRepository.list({ login: 'testlogin' });
  if (testUser.length !== 0) {
    await userRepository.delete(testUser[0].id);
  }

  const newTestUser = {
    name: 'test',
    login: 'testlogin',
    password: 'testpass',
  };
  await userRepository.create(newTestUser);
  user = await auth.auth('testlogin', 'testpass');
});

afterAll(async () => {
  await userRepository.delete(user.id);
});

describe('Test auth errors', () => {
  it('should require authorization', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(401);
  });

  it('should return correct error message', async () => {
    const res = await request(app).get('/users');
    expect(res.body.error).toBe('Usuário não autenticado.');
  });
});

describe('Test user endpoints', () => {
  it('should list users', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(200);
  });

  it('should return correct error message and status 400 for name', async () => {
    const invalidUser = {
      name: 'iN',
      login: 'validLogin',
      password: 'validPass',
    };

    const res = await request(app).post('/users').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Nome deve ter entre 6 e 255 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status for invalid login', async () => {
    const invalidUser = {
      name: 'Valid Name',
      login: 'invalidUser1010101010101010',
      password: 'validPass',
    };

    const res = await request(app).post('/users').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Usuário deve ter entre 5 e 20 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 400 for invalid password', async () => {
    const invalidUser = {
      name: 'Valid Name',
      login: 'validUser',
      password: '123',
    };

    const res = await request(app).post('/users').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Senha deve ter no mínimo 6 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 404', async () => {
    const res = await request(app).delete(`/users/${(user.id + 1)}`).set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(404);
    expect(res.body[0].msg).toBe('Este ID não existe no sistema!');
  });

  it('should update user', async () => {
    const userToUpdate = {
      name: 'Valid Name',
      login: 'UpdatedUser',
      password: '123456up',
    };

    const res = await request(app).put(`/users/${(user.id)}`).set('Authorization', `Bearer ${user.token}`).send(userToUpdate);
    expect(res.status).toBe(200);
  });

  it('should fail to update invalid user', async () => {
    const invalidUserToUpdate = {
      name: 'This is Valid',
      login: 'not',
      password: 'validPassword',
    };
    const res = await request(app).put(`/users/${(user.id)}`).set('Authorization', `Bearer ${user.token}`).send(invalidUserToUpdate);
    expect(res.status).toBe(400);
  });

  it('should show correct error message by updating invalid user login', async () => {
    const invalidUserToUpdate = {
      name: 'This is Valid',
      login: 'not',
      password: 'validPassword',
    };
    const res = await request(app).put(`/users/${(user.id)}`).set('Authorization', `Bearer ${user.token}`).send(invalidUserToUpdate);
    expect(res.body[0].msg).toBe('Usuário deve ter entre 5 e 20 caracteres.');
  });

  it('should show correct error message by updating invalid user name', async () => {
    const invalidUserToUpdate = {
      name: 'not',
      login: 'validOne',
      password: 'validPassword',
    };
    const res = await request(app).put(`/users/${(user.id)}`).set('Authorization', `Bearer ${user.token}`).send(invalidUserToUpdate);
    expect(res.body[0].msg).toBe('Nome deve ter entre 6 e 255 caracteres.');
  });

  it('should show correct error message by updating invalid user password', async () => {
    const invalidUserToUpdate = {
      name: 'This is Valid',
      login: 'validOne',
      password: 'not',
    };
    const res = await request(app).put(`/users/${(user.id)}`).set('Authorization', `Bearer ${user.token}`).send(invalidUserToUpdate);
    expect(res.body[0].msg).toBe('Senha deve ter no mínimo 6 caracteres.');
  });
});
