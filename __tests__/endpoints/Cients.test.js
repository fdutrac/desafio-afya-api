/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const auth = require('../../src/services/Login');
const userRepository = require('../../src/services/Clients');

let user;

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
  it('should require authorization', async () => {
    const res = await request(app).get('/clients');
    expect(res.status).toBe(401);
  });

  it('should return correct error message', async () => {
    const res = await request(app).get('/clients');
    expect(res.body.error).toBe('Usuário não autenticado.');
  });
});

describe('Test clients endpoints', () => {
  it('should list users', async () => {
    const res = await request(app).get('/clients').set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(200);
  });

  it('should return correct error message and status 400 for name', async () => {
    const invalidUser = {
      name: 'iN',
      login: 'validLogin',
      password: 'validPass',
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Nome deve ter entre 3 e 255 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status for invalid login', async () => {
    const invalidUser = {
      name: 'Valid Name',
      login: 'invalidUser1010101010101010',
      password: 'validPass',
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Usuário deve ter entre 5 e 20 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 400 for invalid password', async () => {
    const invalidUser = {
      name: 'Valid Name',
      login: 'validUser',
      password: '123',
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidUser);
    expect(res.body[0].msg).toBe('Senha deve ter no mínimo 6 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 404', async () => {
    const res = await request(app).delete(`/clients/${(user.id + 1)}`).set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Este ID não existe no sistema!');
  });
});

// Testa cadastrar usuario inválido

// Testa cadastrar usuario válido

// it('should return status 201', async () => {
//   const res = await request(app).post('/clients').send(fakeValidUser, auth);
//   expect(res.status).toBe(201);
//   this.testUser = res.body;
// });

// Testa alterar Usuário com dados inválidos

// it('should return status 400', async () => {
//   const res = await request(app).put(`/clients/${this.testUser.id}`).send(fakeInvalidUser, auth);
//   expect(res.status).toBe(400);
// });

// Testa alterar Usuário com dados válidos

// it('should return status 200', async () => {
//   const res = await request(app).put(`/clients/${this.testUser.id}`).send(fakeValidUpdate, auth);
//   expect(res.status).toBe(200);
// });

// Testa deletar usuário inexistente

// it('should return status 404', async () => {
//   const res = await request(app).delete(`/clients/${(this.testUser.id + 1)}`);
//   expect(res.status).toBe(404);
// });

// // Testa deletar usuário existente

// it('should return status 200', async () => {
//   const res = await request(app).delete(`/clients/${this.testUser.id}`);
//   expect(res.status).toBe(200);
// });
