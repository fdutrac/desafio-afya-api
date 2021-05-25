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
            length: 255,
            nullable: false
        }
    }
})