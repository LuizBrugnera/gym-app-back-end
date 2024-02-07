import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkoutExercise1707305854875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "workout_exercise" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "workoutId" UUID,
                "exerciseId" UUID,
                "sets" INT NOT NULL,
                "rest" INTERVAL NOT NULL,
                "description" TEXT,
                CONSTRAINT "PK_workout_exercise_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_workout_exercise_workoutId" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_workout_exercise_exerciseId" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE
            );
            CREATE INDEX "idx_workout_exercise_workout_id" ON "workout_exercise" ("workoutId");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "workout_exercise";
        `);
  }
}
