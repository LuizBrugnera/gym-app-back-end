import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiet1707306267470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "diet" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "studentId" UUID,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "date_start" DATE NOT NULL,
                "date_end" DATE NOT NULL,
                "status" "status_type_enum" NOT NULL, -- Assume this enum is already defined in a previous migration
                "calories" INT,
                "fat" INT,
                "carbohydrates" INT,
                "protein" INT,
                CONSTRAINT "PK_diet_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_diet_studentId" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE
            );
            CREATE INDEX "idx_diet_student_id_status" ON "diet" ("studentId", "status");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "diet";
        `);
  }
}
