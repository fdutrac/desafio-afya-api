let EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Prontuário",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        dataAbertura:{
            type: Date,
            nullable: false
        }
    }
})