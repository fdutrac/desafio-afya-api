const { EntitySchema } = require('typeorm');
const BaseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'MedicalRecordHistory',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date: {
      type: 'date',
      nullable: false,
    },
    hour: {
      type: 'time',
      nullable: false,
    },
    description: {
      type: String,
      length: 255,
      nullable: false,
    },
    ...BaseModel,
  },
  relations: {
    medicalRecord: {
      type: 'many-to-one',
      target: 'MedicalRecord',
    },
    specialist: {
      type: 'many-to-one',
      target: 'Specialist',
    },
  },

});
