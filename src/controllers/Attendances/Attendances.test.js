/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

const fakeInvalidAttendance = {
  name: '3132324',
  user: '3132324',
};

it('should return status 200', async () => {
  const res = await request(app).get('/atendimentos');
  expect(res.status).toBe(200);
});

it('should return status 400', async () => {
  const res = await request(app).post('/atendimentos', fakeInvalidAttendance);
  expect(res.status).toBe(400);
});
