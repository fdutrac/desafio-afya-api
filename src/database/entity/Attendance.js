const { EntitySchema } = require('typeorm');
const baseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'Attendance',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date_scheduling: {
      type: Date,
      nullable: false,
      createDate: true,
    },
    date_attendance: {
      type: 'date',
      nullable: false,
    },
    date_hour: {
      type: 'time',
      nullable: false,
    },
    value: {
      type: String,
      length: 255,
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: ['AGENDADO', 'REALIZADO', 'CANCELADO'],
      default: 'AGENDADO',
      nullable: false,
    },
    ...baseModel,
  },
  relations: {
    specialist: {
      type: 'many-to-one',
      target: 'Specialist',
      cascade: false,
    },
    patient: {
      type: 'many-to-one',
      target: 'Client',
      cascade: false,
    },
  },
});
