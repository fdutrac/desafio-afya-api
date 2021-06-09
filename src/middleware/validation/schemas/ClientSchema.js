const clientRepository = require('../../../services/Clients');

module.exports = {
  isValid: {
    name: {
      isLength: {
        errorMessage: 'Nome deve ter entre 3 e 255 caracteres.',
        options: { min: 3, max: 255 },
      },
    },
    cpf: {
      isLength: {
        errorMessage: 'CPF deve ter entre 11 e 14 caracteres (com pontos).',
        options: { min: 11, max: 14 },
      },
    },
    phone: {
      isLength: {
        errorMessage: 'Telefone deve ter no mínimo 9 dígitos! (Incluindo DDD)',
        options: { min: 9, max: 14 },
      },
    },
    cellphone: {
      notEmpty: false,
      isLength: {
        errorMessage: 'Celular deve ter no mínimo 9 dígitos! (Incluindo DDD)',
        options: { min: 9, max: 14 },
      },
    },
    mail: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Email inválido!',
      },
      errorMessage: 'E-mail é obrigatório!',
    },
    bloodtype: {
      notEmpty: false,
      isIn: {
        options: [['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']],
        errorMessage: 'Tipo sanguíneo inválido.',
      },
    },
    'address.cep': {
      notEmpty: true,
      isLength: {
        options: { min: 8, max: 8 },
        errorMessage: 'CEP inválido!',
      },
      errorMessage: 'Informe um CEP válido.',
    },
    'address.street': {
      notEmpty: true,
      errorMessage: 'Rua é um campo obrigatório.',
    },
    'address.neighborhood': {
      notEmpty: true,
      errorMessage: 'Bairro é um campo obrigatório.',
    },
    'address.locality': {
      notEmpty: true,
      errorMessage: 'Cidade é um campo obrigatório.',
    },
    'address.state': {
      notEmpty: true,
      errorMessage: 'Estado é um campo obrigatório.',
    },
  },
  exists: {
    doExist: {
      custom: {
        errorMessage: 'Cliente não existe.',
        options: async (value, { req }) => {
          const exist = await clientRepository.getOne(req.params.id);
          if (!exist) {
            return Promise.reject(Error(this.errorMessage));
          }
          return true;
        },
      },
    },
  },
};
