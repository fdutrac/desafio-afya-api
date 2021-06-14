/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const auth = require('../../src/services/Login');
const userRepository = require('../../src/services/Users');
const clientsRepository = require('../../src/services/Clients');
const startDB = require('../../src/database/connectDB');

let user;
const client = {
  id: 99999,
};

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
  await clientsRepository.delete(client.id);
});

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
  it('should list clients', async () => {
    const res = await request(app).get('/clients').set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(200);
  });

  it('should return correct error message and status 400 for name', async () => {
    const invalidClient = {
      name: 'not',
      cpf: '31001012414',
      phone: '16 9222-2222',
      cellphone: '16 4544-9329',
      mail: 'testecadastro@email.com',
      bloodtype: 'O-',
      address: {
        number: '223',
        cep: '14050020',
        street: 'Rua dos Paulistanos',
        neighborhood: 'Higienópolis',
        locality: 'Ribeirão Preto',
        state: 'SP',
      },
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidClient);
    expect(res.body[0].msg).toBe('Nome deve ter entre 6 e 255 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status for invalid CPF', async () => {
    const invalidClient = {
      name: 'Nome Valido de Teste',
      cpf: '31001012',
      phone: '16 9222-2222',
      cellphone: '16 4544-9329',
      mail: 'pomarola@teste.com',
      bloodtype: 'O-',
      address: {
        number: '223',
        cep: '14050020',
        street: 'Rua dos Paulistanos',
        neighborhood: 'Higienópolis',
        locality: 'Ribeirão Preto',
        state: 'SP',
      },
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidClient);
    expect(res.body[0].msg).toBe('CPF deve ter 11 caracteres.');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 400 for invalid password', async () => {
    const invalidClient = {
      name: 'Nome Valido de Teste',
      cpf: '31001012333',
      phone: '16 9222-2222',
      cellphone: '16 4544-9329',
      mail: 'pomarola',
      bloodtype: 'O-',
      address: {
        number: '223',
        cep: '14050020',
        street: 'Rua dos Paulistanos',
        neighborhood: 'Higienópolis',
        locality: 'Ribeirão Preto',
        state: 'SP',
      },
    };

    const res = await request(app).post('/clients').set('Authorization', `Bearer ${user.token}`).send(invalidClient);
    expect(res.body[0].msg).toBe('Email inválido!');
    expect(res.status).toBe(400);
  });

  it('should return correct error message and status 404', async () => {
    const res = await request(app).delete(`/clients/${(client.id)}`).set('Authorization', `Bearer ${user.token}`);
    expect(res.status).toBe(404);
    expect(res.body[0].msg).toBe('Este ID não existe no sistema!');
  });

  it('should create a new client', async () => {
    const validClient = {
      name: 'Nome Valido de Teste',
      cpf: '99999999999',
      phone: '99 9999999999',
      cellphone: '16 45449329',
      mail: 'testedcadastro@teste.com',
      bloodtype: 'O-',
      address: {
        number: '999',
        cep: '99999999',
        street: 'Rua dos Testes que Passam',
        neighborhood: 'Testhood',
        locality: 'Ribeirão Preto',
        state: 'SP',
      },
    };
    const res = await request(app).post('/clients/').set('Authorization', `Bearer ${user.token}`).send(validClient);
    client.id = res.body.id;
    expect(res.status).toBe(201);
  });
});
