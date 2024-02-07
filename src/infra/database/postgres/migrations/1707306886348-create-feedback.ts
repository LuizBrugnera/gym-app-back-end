import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeedback1707306886348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "feedback" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "studentId" UUID,
                "text" TEXT NOT NULL,
                "image_url" VARCHAR(255),
                "video_url" VARCHAR(255),
                CONSTRAINT "PK_feedback_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_feedback_studentId" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "feedback";
        `);
  }
}
