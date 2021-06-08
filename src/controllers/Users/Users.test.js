/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

const fakeInvalidUser = {
  name: 'ze',
  login: '12312312312323124125125125',
  password: '123',
};

const fakeInvalidId = 0;

// const fakeValidUser = {
//   name: 'José Matheus da Silva',
//   login: 'josematheus12',
//   password: '123456',
// };

it('should return status 200', async () => {
  const res = await request(app).get('/usuarios');
  expect(res.status).toBe(200);
});

it('should return status 400', async () => {
  const res = await request(app).post('/usuarios', fakeInvalidUser);
  expect(res.status).toBe(400);
});

it('should return status 400', async () => {
  const res = await request(app).put('/usuarios/5', fakeInvalidUser);
  expect(res.status).toBe(400);
});

// it('should return status 200', async () => {
//   const res = await request(app).post('/usuarios', fakeValidUser);
//   expect(res.status).toBe(200);
// });

it('should return status 404', async () => {
  const res = await request(app).delete(`/usuarios/${fakeInvalidId}`);
  expect(res.status).toBe(404);
});
