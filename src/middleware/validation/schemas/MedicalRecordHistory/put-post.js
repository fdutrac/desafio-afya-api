const medicalRecordsRepository = require('../../../../services/MedicalRecords');
const specialistsRepository = require('../../../../services/Specialists');

module.exports = {
  date: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar a data que ocorreu o atendimento.',
  },
  hour: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar o horário que ocorreu o atendimento.',
  },
  description: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar uma descrição.',
  },
  medicalRecord: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar o Id do Prontuário que esse registro pertence.',
  },
  specialist: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar um id de Especialista para o atendimento.',
  },
  dontExist: {
    custom: {
      options: async (value, { req }) => {
        const existRecord = await medicalRecordsRepository.getOne(req.body.medicalRecord);

        const existSpecialist = await specialistsRepository.getOne(req.body.specialist);

        if (!existRecord) {
          return Promise.reject(Error('Não existe nenhum Prontuário com esse id cadastrado!'));
        }
        if (!existSpecialist) {
          return Promise.reject(Error('Não existe nenhum Especialista com esse id cadastrado!'));
        }
        return true;
      },
    },
  },
};
