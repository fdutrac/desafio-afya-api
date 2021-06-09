const userRepository = require('../../../services/Users');

module.exports = {
  isValid: {
    name: {
      isLength: {
        errorMessage: 'Nome deve ter entre 3 e 255 caracteres.',
        options: { min: 3, max: 255 },
      },
    },
    login: {
      isLength: {
        errorMessage: 'Usuário deve ter entre 5 e 20 caracteres.',
        options: { min: 3, max: 20 },
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
  },
  exists: {
    doExist: {
      custom: {
        errorMessage: 'Usuário não existe.',
        options: async (value, { req }) => {
          const exist = await userRepository.getOne(req.params.id);
          if (!exist) {
            return Promise.reject(Error(this.errorMessage));
          }
          return true;
        },
      },
    },
  },
};
