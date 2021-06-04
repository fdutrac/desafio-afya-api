// const { MigrationInterface, QueryRunner } = require("typeorm");

// module.exports = class CriaTabelaUser1621864412129 {
//     name = 'CriaTabelaUser1621864412129'

//     async up(queryRunner) {
//         await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "login" character varying(20) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
//     }

//     async down(queryRunner) {
//         await queryRunner.query(`DROP TABLE "user"`);
//     }
// }
