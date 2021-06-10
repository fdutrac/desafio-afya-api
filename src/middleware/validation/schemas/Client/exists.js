const clientsRepository = require('../../../../services/Clients');

module.exports = {
  doExist: {
    custom: {
      errorMessage: 'Este ID não existe no sistema!',
      options: async (value, { req }) => {
        const exist = await clientsRepository.getOne(req.params.id);
        if (!exist) {
          return Promise.reject(Error(this.errorMessage));
        }
        return true;
      },
    },
  },
};
