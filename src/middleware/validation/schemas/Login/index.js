const userRepository = require('../../../../services/Users');

module.exports = {
  login: {
    isLength: {
      errorMessage: 'Usuário deve ter entre 5 e 20 caracteres.',
      options: { min: 5, max: 20 },
    },
  },
  password: {
    isLength: {
      errorMessage: 'Senha deve ter no mínimo 6 caracteres.',
      options: { min: 6 },
    },
  },
  doExist: {
    custom: {
      options: async (value, { req }) => {
        // console.log(req.body);
        const exist = await userRepository.getOne({ login: req.body.login });
        if (!exist) {
          console.log('passei pelo mid');
          return Promise.reject(Error('Login ou senha inválidos.'));
        }
        return true;
      },
    },
  },
};
