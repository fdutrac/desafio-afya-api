const attendancesRepository = require('../../../../services/Attendances');

module.exports = {
  date_attendance: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar uma data para o atendimento.',
  },
  date_hour: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar um horário para o atendimento.',
  },
  value: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar um valor para o atendimento.',
  },
  specialist: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar um id de Especialista para o atendimento.',
  },
  patient: {
    notEmpty: true,
    errorMessage: 'É obrigatório informar um id de Paciente para o atendimento.',
  },
  dontExist: {
    custom: {
      options: async (value, { req }) => {
        const existDate = await attendancesRepository.list({
          date_attendance: req.body.date_attendance,
        });

        const existHour = await attendancesRepository.list({
          date_hour: req.body.date_hour,
        });

        const existPatient = await attendancesRepository.getOne({
          patient: req.body.patient,
        });

        const existSpecialist = await attendancesRepository.getOne({
          specialist: req.body.specialist,
        });

        if (!existPatient) {
          return Promise.reject(Error('Não existe nenhum Paciente com esse id cadastrado!'));
        }
        if (!existSpecialist) {
          return Promise.reject(Error('Não existe nenhum Especialista com esse id cadastrado!'));
        }
        if (existDate !== [] && existHour !== [] && existPatient !== []) {
          return Promise.reject(Error('Já existe um Atendimento desse Paciente neste horário.'));
        }
        if (existDate && existHour && existSpecialist) {
          return Promise.reject(Error('Já existe um Atendimento desse Especialista neste horário.'));
        }
        return true;
      },
    },
  },
};
