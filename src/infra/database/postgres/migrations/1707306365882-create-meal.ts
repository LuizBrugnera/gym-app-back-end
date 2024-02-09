import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMeal1707306365882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "meal_time_type_enum" AS ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');
            
            CREATE TABLE "meal" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "diet_id" UUID,
                "eating_time" "meal_time_type_enum" NOT NULL,
                CONSTRAINT "PK_meal_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_meal_diet_id" FOREIGN KEY ("diet_id") REFERENCES "diet"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "meal";
            DROP TYPE "meal_time_type_enum";
        `);
  }
}
