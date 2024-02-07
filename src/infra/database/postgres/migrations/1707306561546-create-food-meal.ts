import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFoodMeal1707306561546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "food_meal" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "mealId" UUID,
                "foodId" UUID,
                "quantity" INT NOT NULL,
                "measure" VARCHAR(255) NOT NULL,
                CONSTRAINT "PK_food_meal_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_food_meal_mealId" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_food_meal_foodId" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "food_meal";
        `);
  }
}
