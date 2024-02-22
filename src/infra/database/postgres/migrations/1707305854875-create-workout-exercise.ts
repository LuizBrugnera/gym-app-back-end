import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkoutExercise1707305854875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "workout_exercise" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "workout_id" UUID,
                "exercise_id" UUID,
                "sets" VARCHAR(255) NOT NULL,
                "rest" INT NOT NULL,
                "description" TEXT,
                CONSTRAINT "PK_workout_exercise_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_workout_exercise_workout_id" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_workout_exercise_exercise_id" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE
            );
            CREATE INDEX "idx_workout_exercise_workout_id" ON "workout_exercise" ("workout_id");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "workout_exercise";
        `);
  }
}
