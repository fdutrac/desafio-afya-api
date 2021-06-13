const userRepository = require('../../../../services/Users');

module.exports = {
  login: {
    isLength: {
      errorMessage: 'Usuário deve ter entre 5 e 20 caracteres.',
      options: { min: 5, max: 20 },
    },
  },
  password: {
    optional: {
      options: { checkFalsy: true },
    },
    isLength: {
      errorMessage: 'Senha deve ter no mínimo 6 caracteres.',
      options: { min: 6 },
    },
  },
  doExist: {
    custom: {
      options: async (value, { req }) => {
        const exist = await userRepository.getOne({ login: req.body.login });
        if (!exist) {
          return Promise.reject(Error('Login ou senha inválidos.'));
        }
        return true;
      },
    },
  },
};
