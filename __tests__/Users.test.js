const request = require('supertest');
const app = require('../app');
const FakeUserRepository = require('./fakes/users/fakeUserRepository');
const authenticateUser = require('../controllers/Login');
const User = require('../controllers/Users');

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

  // it('should not be able to create a new user with the same login from another', async () => {
  //   await fakeUserRepository.create({
  //     name: 'Maria Jose',
  //     login: 'mariajose7686',
  //     password: 'mj123456',
  //   });

  //   await expect(
  //     fakeUserRepository.create({
  //       name: 'Maria Jose',
  //       login: 'mariajose7686',
  //       password: 'mj123456',
  //     }),
  //   ).rejects.toBeInstanceOf(Error);
  // }); 

//   it('should not be able to login with the wrong password', async () => {
//     await fakeUserRepository.create({
//       name: 'Steve Jobs',
//       login: 'Steves2apple',
//       password: '123456',
//     });

//     await expect(
//       authenticateUser.auth({
//         login: 'Steves2apple',
//         password: '654321',
//       }),
//     ).rejects.toBeInstanceOf(Error);
//   });

//   it('should not be able to login with a non existent user', async () => {
//     await expect(
//       authenticateUser.auth({
//         login: 'chrispbacon',
//         password: 'cr787878',
//       }),
//     ).rejects.toBeInstanceOf(Error);
//   });
// });

// describe('Post Endpoints', () => {
//   it('should authenticate a user', async () => {
//     const user = await User.insert({
//       name: 'Paulo Moura',
//       login: 'paulomoura56',
//       password: '123456',
//     });  
//     const res = await request(app)
//       .post('/login')
//       .send({
//         login: 'paulomoura56',
//         password: '123123',
//       })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toEqual(user)
//   });
// })

// describe('Authentication', () => { 
//   it('should be able to authenticate', async () => {
//     const fakeUserRepository = new FakeUserRepository();
     
//     await User.insert({
//       name: 'Paulo Moura',
//       login: 'paulomoura56',
//       password: '123456',
//     });  
    
//     const response = await authenticateUser.auth({
//       login: 'paulomoura56',
//       password: '123456',
//     });

//     expect(response).toHaveProperty('token')
  
//   })    
// });

// router.post('/login', Controllers.Login.auth);

// it('should be able to authenticate', async () => {
//   const user = await fakeUserRepository.create({
//     name: 'Paulo Moura',
//     login: 'paulomoura56',
//     password: '123456',
//   });

//   const response = await authenticateUser.auth({
//     login: 'paulomoura56',
//     password: '123456',
//   });

//   expect(response.user).toEqual(user);
// });