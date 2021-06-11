const specialistsRepository = require('../../../../services/Specialists');

module.exports = {
  doExist: {
    custom: {
      errorMessage: 'Este ID não existe no sistema!',
      options: async (value, { req }) => {
        const exist = await specialistsRepository.getOne(req.params.id);
        if (!exist) {
          return Promise.reject(Error(this.errorMessage));
        }
        return true;
      },
    },
  },
};
