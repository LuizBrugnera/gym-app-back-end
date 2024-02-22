import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFood1707306520428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "food" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "name" VARCHAR(255) NOT NULL,
                "calories" FLOAT NOT NULL,
                "fat" FLOAT NOT NULL,
                "carbohydrates" FLOAT NOT NULL,
                "protein" FLOAT NOT NULL,
                "image_url" VARCHAR(255),
                CONSTRAINT "PK_food_id" PRIMARY KEY ("id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "food";
        `);
  }
}
