import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentDataCheck1707305474267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TYPE "sex_enum" AS ENUM('MALE', 'FEMALE');
                
                CREATE TABLE "student_data_check" (
                    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                    "student_id" UUID,
                    "date" DATE NOT NULL,
                    "age" INT NOT NULL,
                    "bf" NUMERIC NOT NULL,
                    "body_density" NUMERIC,
                    "weight" NUMERIC NOT NULL,
                    "chest" NUMERIC,
                    "axillary" NUMERIC,
                    "tricep" NUMERIC,
                    "subscapular" NUMERIC,
                    "abdominal" NUMERIC,
                    "suprailiac" NUMERIC,
                    "thigh" NUMERIC,
                    "height" NUMERIC NOT NULL,
                    "sex" "sex_enum" NOT NULL,
                    CONSTRAINT "PK_student_data_check_id" PRIMARY KEY ("id"),
                    CONSTRAINT "FK_student_data_check_student_id" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE
                );
                CREATE INDEX "idx_student_data_check_student_id" ON "student_data_check" ("student_id");
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                DROP TABLE "student_data_check";
                DROP TYPE "sex_enum";
            `);
  }
}
