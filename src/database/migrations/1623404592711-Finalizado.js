const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Finalizado1623404592711 {
    name = 'Finalizado1623404592711'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "login" character varying(20) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "client_bloodtype_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cpf" character varying(14) NOT NULL, "phone" character varying(14) NOT NULL, "cellphone" character varying(14), "mail" character varying(255) NOT NULL, "bloodtype" "client_bloodtype_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer NOT NULL, "medicalRecordId" integer, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "UQ_adb3243dc87076493f46ff37fd3" UNIQUE ("mail"), CONSTRAINT "REL_6e6c7c79fbf5ab39520cd1723e" UNIQUE ("addressId"), CONSTRAINT "REL_5858a6d8a0a335a4e41f02a1fd" UNIQUE ("medicalRecordId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "number" character varying(50), "complement" character varying(255), "neighborhood" character varying(100) NOT NULL, "locality" character varying(255) NOT NULL, "state" character varying(100) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialist" ("id" SERIAL NOT NULL, "register" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, "phone" character varying(14) NOT NULL, "cellphone" character varying(14), "mail" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" integer NOT NULL, "professionId" integer NOT NULL, CONSTRAINT "UQ_8b757a6a6b863c1da7ebfc2e6c8" UNIQUE ("register"), CONSTRAINT "UQ_6e325d2df77cabb01c855998791" UNIQUE ("mail"), CONSTRAINT "REL_772feb82534d81f3d3aaf08594" UNIQUE ("addressId"), CONSTRAINT "PK_461a4a90df7daf980d8b79bc3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profession" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3113ca18873244db8aac3441ae6" UNIQUE ("name"), CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_record" ("id" SERIAL NOT NULL, "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" integer NOT NULL, CONSTRAINT "REL_8a3c253c9c4d9e9e87b71ffe0e" UNIQUE ("clientId"), CONSTRAINT "PK_d96ede886356ac47ddcbb0bf3a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_record_history" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "medicalRecordId" integer, "specialistId" integer, CONSTRAINT "REL_e415a61f9a6e472b1f6d4b9a8b" UNIQUE ("specialistId"), CONSTRAINT "PK_b300b90c3c1456711dfc1696300" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "attendance_status_enum" AS ENUM('AGENDADO', 'REALIZADO', 'CANCELADO')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" SERIAL NOT NULL, "date_scheduling" TIMESTAMP NOT NULL DEFAULT now(), "date_attendance" date NOT NULL, "date_hour" TIME NOT NULL, "value" character varying(255) NOT NULL, "status" "attendance_status_enum" NOT NULL DEFAULT 'AGENDADO', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "specialistId" integer, "patientId" integer, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_5858a6d8a0a335a4e41f02a1fd2" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specialist" ADD CONSTRAINT "FK_772feb82534d81f3d3aaf085949" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specialist" ADD CONSTRAINT "FK_3babd6cec7e7fc58556e55a63ce" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record" ADD CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" ADD CONSTRAINT "FK_bfedada5a6434213e8dda39f436" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" ADD CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_1e20583fef6c70d9fcf118dc6d0" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_1612c3ec2464d87db87eeba1c9d" FOREIGN KEY ("patientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_1612c3ec2464d87db87eeba1c9d"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_1e20583fef6c70d9fcf118dc6d0"`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" DROP CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb"`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" DROP CONSTRAINT "FK_bfedada5a6434213e8dda39f436"`);
        await queryRunner.query(`ALTER TABLE "medical_record" DROP CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee"`);
        await queryRunner.query(`ALTER TABLE "specialist" DROP CONSTRAINT "FK_3babd6cec7e7fc58556e55a63ce"`);
        await queryRunner.query(`ALTER TABLE "specialist" DROP CONSTRAINT "FK_772feb82534d81f3d3aaf085949"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_5858a6d8a0a335a4e41f02a1fd2"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "medical_record_history"`);
        await queryRunner.query(`DROP TABLE "medical_record"`);
        await queryRunner.query(`DROP TABLE "profession"`);
        await queryRunner.query(`DROP TABLE "specialist"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_bloodtype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
