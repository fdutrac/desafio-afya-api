/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const auth = require('../src/services/Login');
const userRepository = require('../src/services/Users');

let user;

const invalidUser = {
  name: 'iN',
  login: 'validLogin',
  password: 'validPass',
};

jest.setTimeout(10000);
beforeAll(async () => {
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

// Testa listar usuario

describe('Test auth errors', () => {
  it('Should require authorization', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.status).toBe(401);
  });
  it('Should return correct error message', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.body.error).toBe('Usuário não autenticado.');
  });
});

describe('Test user endpoints', () => {
  it('Should list users', async () => {
    const res = await request(app).get('/usuarios').set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(200);
  });
  it('should return status 400 by sendind invalid user', async () => {
    const res = await request(app).post('/usuarios').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.status).toBe(400);
  });
  it('should return error msg for name', async () => {
    const res = await request(app).post('/usuarios').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Nome deve ter entre 3 e 255 caracteres.');
    invalidUser.name = 'Valid Name';
  });
  it('should return error msg for login', async () => {
    invalidUser.login = 'eutenhomuitomaisque20caracteres';
    const res = await request(app).post('/usuarios').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Usuário deve ter entre 5 e 20 caracteres.');
    invalidUser.login = 'validLogin';
  });
  it('should return error msg for password', async () => {
    invalidUser.password = '123';
    const res = await request(app).post('/usuarios').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Senha deve ter no mínimo 6 caracteres.');
  });
});

// Testa cadastrar usuario inválido

// Testa cadastrar usuario válido

// it('should return status 201', async () => {
//   const res = await request(app).post('/usuarios').send(fakeValidUser, auth);
//   expect(res.status).toBe(201);
//   this.testUser = res.body;
// });

// Testa alterar Usuário com dados inválidos

// it('should return status 400', async () => {
//   const res = await request(app).put(`/usuarios/${this.testUser.id}`).send(fakeInvalidUser, auth);
//   expect(res.status).toBe(400);
// });

// Testa alterar Usuário com dados válidos

// it('should return status 200', async () => {
//   const res = await request(app).put(`/usuarios/${this.testUser.id}`).send(fakeValidUpdate, auth);
//   expect(res.status).toBe(200);
// });

// Testa deletar usuário inexistente

// it('should return status 404', async () => {
//   const res = await request(app).delete(`/usuarios/${(this.testUser.id + 1)}`);
//   expect(res.status).toBe(404);
// });

// // Testa deletar usuário existente

// it('should return status 200', async () => {
//   const res = await request(app).delete(`/usuarios/${this.testUser.id}`);
//   expect(res.status).toBe(200);
// });
