let EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema ({
    name: "Attendance",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        date_scheduling:{
            type: Date,
            nullable: false
        },
        date_attendance:{
            type: Date,
            nullable: false
        },
        date_hour:{
            type: Date,
            nullable: false
        },
        value:{
            type: String,
            length: 255,
            nullable: false
        },
        status: {
            type: 'enum',
            enum: ['AGENDADO', 'REALIZADO', 'CANCELADO'],
            nullable: false
          }
    },
    relations: {
        specialist: {
            type: "one-to-one",
            target: "Specialist",
            joinColumn: true,
            cascade: false
        },
        patient: {
            type: "one-to-one",
            target: "Client",
            joinColumn: true,
            cascade: false
        }
    }

})