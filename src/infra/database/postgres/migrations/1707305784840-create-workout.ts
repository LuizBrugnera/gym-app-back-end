import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkout1707305784840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "workout_status_type_enum" AS ENUM('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELED');
            
            CREATE TABLE "workout" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "studentId" UUID,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "date_start" DATE NOT NULL,
                "date_end" DATE NOT NULL,
                "status" "workout_status_type_enum" NOT NULL,
                CONSTRAINT "PK_workout_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_workout_studentId" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE
            );
            CREATE INDEX "idx_workout_student_id_status" ON "workout" ("studentId", "status");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "workout";
            DROP TYPE "workout_status_type_enum";
        `);
  }
}
