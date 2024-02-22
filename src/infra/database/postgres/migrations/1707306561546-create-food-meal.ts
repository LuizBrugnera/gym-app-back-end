import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFoodMeal1707306561546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "measure_enum" AS ENUM('MILILITERS', 'LITERS', 'GRAMS', 'KILOGRAMS');

            CREATE TABLE "food_meal" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "meal_id" UUID,
                "food_id" UUID,
                "quantity" FLOAT NOT NULL, 
                "measure" "measure_enum" NOT NULL,
                CONSTRAINT "PK_food_meal_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_food_meal_meal_id" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_food_meal_food_id" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "food_meal";
            DROP TYPE "measure_enum";
        `);
  }
}
