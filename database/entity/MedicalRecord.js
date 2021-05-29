let EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Medical_Record",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        openingDate:{
            type: Date,
            nullable: false
        }
    },
    relations: {
        client: {
            type: "one-to-one",
            target: "Client",
            cascade: false,
        },
    }
})