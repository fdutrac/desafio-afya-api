const _ = require('lodash');

module.exports = {
  isCorrect: {
    custom: {
      errorMessage: 'Parâmetros de busca inválidos!',
      options: async (value, { req }) => {
      // Verifica se existem parametros de consulta e os valida;
        if (!_.isEmpty(req.query)) {
          if (
            !req.query.date_scheduling
            && !req.query.date_attendance
            && !req.query.patient
            && !req.query.specialist
          ) return Promise.reject(Error(this.errorMessage));
        }
        return true;
      },
    },
  },
};
