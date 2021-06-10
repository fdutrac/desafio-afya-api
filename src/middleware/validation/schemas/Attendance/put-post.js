const attendancesRepository = require('../../../../services/Attendances');
const clientsRepository = require('../../../../services/Clients');
const specialistsRepository = require('../../../../services/Specialists');

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
        const isPatientBusy = await attendancesRepository.list({
          date_attendance: req.body.date_attendance,
          date_hour: req.body.date_hour,
          patient: req.body.patient,
        });

        const isSpecialistBusy = await attendancesRepository.list({
          date_attendance: req.body.date_attendance,
          date_hour: req.body.date_hour,
          specialist: req.body.patient,
        });

        const existPatient = await clientsRepository.getOne(req.body.patient);

        const existSpecialist = await specialistsRepository.getOne(req.body.specialist);

        if (!existPatient) {
          return Promise.reject(Error('Não existe nenhum Paciente com esse id cadastrado!'));
        }
        if (!existSpecialist) {
          return Promise.reject(Error('Não existe nenhum Especialista com esse id cadastrado!'));
        }
        if (isPatientBusy) {
          return Promise.reject(Error('Já existe um Atendimento desse Paciente neste horário.'));
        }
        if (isSpecialistBusy) {
          return Promise.reject(Error('Já existe um Atendimento desse Especialista neste horário.'));
        }
        return true;
      },
    },
  },
};
