let EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema ({
    name: "Medical_Record_History",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        date:{
            type: Date,
            nullable: false
        },
        hour:{
            type: Date,
            nullable: false
        },
        description:{
            type: String,
            length: 255,
            nullable: false
        }
    },
    relations: {
        medical_record: {
            type: "many-to-one",
            target: "Medical_Record"
        },
        specialist: {
            type: "one-to-one",
            target: "Specialist",
            joinColumn: true,
        }
    }

})