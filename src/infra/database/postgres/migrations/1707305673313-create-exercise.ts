import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExercise1707305673313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "exercise_type_enum" AS ENUM('CARDIO', 'STRENGTH', 'FLEXIBILITY', 'BALANCE', 'STRETCHING');
            CREATE TYPE "muscle_target_type_enum" AS ENUM('CHEST', 'SHOULDER', 'FOREARM', 'BICEPS', 'TRICEPS', 'ABDOMEN', 'BACK', 'NECK', 'QUADRICEPS', 'HAMSTRING', 'CALF');
            
            CREATE TABLE "exercise" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "description" TEXT,
                "video_url" VARCHAR(255),
                "image_url" VARCHAR(255),
                "type" "exercise_type_enum" NOT NULL,
                "muscle_target" "muscle_target_type_enum" NOT NULL,
                "need_equipment" BOOLEAN NOT NULL,
                CONSTRAINT "PK_exercise_id" PRIMARY KEY ("id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "exercise";
            DROP TYPE "exercise_type_enum";
            DROP TYPE "muscle_target_type_enum";
        `);
  }
}
