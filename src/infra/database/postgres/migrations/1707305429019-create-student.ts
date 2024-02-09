import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudent1707305429019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TYPE "sex_enum_student" AS ENUM('MALE', 'FEMALE');
                
                CREATE TABLE "student" (
                    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                    "trainer_id" UUID,
                    "name" VARCHAR(255) NOT NULL,
                    "email" VARCHAR(255) NOT NULL UNIQUE,
                    "password_hash" CHAR(60) NOT NULL,
                    "birthdate" DATE NOT NULL,
                    "sex" "sex_enum_student" NOT NULL,
                    CONSTRAINT "PK_student_id" PRIMARY KEY ("id"),
                    CONSTRAINT "FK_student_trainer_id" FOREIGN KEY ("trainer_id") REFERENCES "trainer"("id") ON DELETE CASCADE
                );
                CREATE INDEX "idx_student_trainer_id" ON "student" ("trainer_id");
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                DROP TABLE "student";
                DROP TYPE "sex_enum_student"; 
            `);
  }
}
