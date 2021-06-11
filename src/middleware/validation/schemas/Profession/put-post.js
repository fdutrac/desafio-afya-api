const professionsRepository = require('../../../../services/Professions');

module.exports = {
  name: {
    notEmpty: true,
    errorMessage: 'O título da Profissão é obrigatório.',
  },
  dontExist: {
    custom: {
      options: async (value, { req }) => {
        const exist = await professionsRepository.list({ name: req.body.name });
        if (exist.length !== 0) {
          return Promise.reject(Error('Já existe uma Profissão com este nome cadastrado no sistema.'));
        }
        return true;
      },
    },
  },
};
