import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTrainer1707305246832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE "trainer" (
                    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                    "name" VARCHAR(255) NOT NULL,
                    "email" VARCHAR(255) NOT NULL UNIQUE,
                    "password_hash" CHAR(60) NOT NULL,
                    "birthdate" DATE NOT NULL,
                    PRIMARY KEY ("id")
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                DROP TABLE "trainer";
            `);
  }
}
