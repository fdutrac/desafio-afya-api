/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

const testUser = { };

const fakeInvalidUser = {
  name: 'ze',
  login: '12312312312323124125125125',
  password: '123',
};

const fakeValidUser = {
  name: 'José Matheus da silva',
  login: 'josematheus12',
  password: '123456',
};

const fakeValidUpdate = {
  name: 'José Matheus da Silva',
  login: 'josematheus13',
  password: '123321',
};

// Testa listar usuario

it('should return status 200', async () => {
  const res = await request(app).get('/usuarios');
  expect(res.status).toBe(200);
});

// Testa cadastrar usuario inválido

it('should return status 400', async () => {
  const res = await request(app).post('/usuarios').send(fakeInvalidUser);
  expect(res.status).toBe(400);
});

// Testa cadastrar usuario válido

it('should return status 201', async () => {
  const res = await request(app).post('/usuarios').send(fakeValidUser);
  expect(res.status).toBe(201);
  this.testUser = res.body;
});

// Testa alterar Usuário com dados inválidos

it('should return status 400', async () => {
  const res = await request(app).put(`/usuarios/${this.testUser.id}`).send(fakeInvalidUser);
  expect(res.status).toBe(400);
});

// Testa alterar Usuário com dados válidos

it('should return status 200', async () => {
  const res = await request(app).put(`/usuarios/${this.testUser.id}`).send(fakeValidUpdate);
  expect(res.status).toBe(200);
});

// Testa deletar usuário inexistente

it('should return status 404', async () => {
  const res = await request(app).delete(`/usuarios/${(this.testUser.id + 1)}`);
  expect(res.status).toBe(404);
});

// Testa deletar usuário existente

it('should return status 200', async () => {
  const res = await request(app).delete(`/usuarios/${this.testUser.id}`);
  expect(res.status).toBe(200);
});
