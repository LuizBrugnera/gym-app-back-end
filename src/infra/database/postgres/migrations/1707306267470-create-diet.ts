import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiet1707306267470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "diet_status_type_enum" AS ENUM('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELED');

            CREATE TABLE "diet" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "student_id" UUID,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "date_start" DATE NOT NULL,
                "date_end" DATE NOT NULL,
                "status" "diet_status_type_enum" NOT NULL,
                "calories" FLOAT,
                "fat" FLOAT,
                "carbohydrates" FLOAT,
                "protein" FLOAT,
                CONSTRAINT "PK_diet_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_diet_student_id" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE
            );
            CREATE INDEX "idx_diet_student_id_status" ON "diet" ("student_id", "status");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "diet";
            DROP TYPE "diet_status_type_enum";
        `);
  }
}
