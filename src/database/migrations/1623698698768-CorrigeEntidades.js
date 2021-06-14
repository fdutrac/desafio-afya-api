const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CorrigeEntidades1623698698768 {
    name = 'CorrigeEntidades1623698698768'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "medical_record_history" DROP CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb"`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" DROP CONSTRAINT "REL_e415a61f9a6e472b1f6d4b9a8b"`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" ADD CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "medical_record_history" DROP CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb"`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" ADD CONSTRAINT "REL_e415a61f9a6e472b1f6d4b9a8b" UNIQUE ("specialistId")`);
        await queryRunner.query(`ALTER TABLE "medical_record_history" ADD CONSTRAINT "FK_e415a61f9a6e472b1f6d4b9a8bb" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
