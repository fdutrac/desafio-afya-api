const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Attendance',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    date_scheduling: {
      type: 'date',
      nullable: false,
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
      nullable: false,
    },
  },
  relations: {
    specialist: {
      type: 'many-to-one',
      target: 'Specialist',
      // joinColumn: true,
      cascade: false,
    },
    client: {
      type: 'many-to-one',
      target: 'Client',
      // joinColumn: true,
      cascade: false,
    },
  },

});
