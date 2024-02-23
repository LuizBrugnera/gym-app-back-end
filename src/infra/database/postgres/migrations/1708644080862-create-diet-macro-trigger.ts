import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDietNutritionTrigger1707306699999
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_diet_nutrition()
            RETURNS TRIGGER AS $$
            DECLARE
                quantity_in_grams FLOAT;
            BEGIN
                IF NEW.measure = 'KILOGRAMS' THEN
                    quantity_in_grams := NEW.quantity * 1000;
                ELSIF NEW.measure = 'LITERS' THEN
                    quantity_in_grams := NEW.quantity * 1000;
                ELSIF NEW.measure = 'MILILITERS' THEN
                    quantity_in_grams := NEW.quantity;
                ELSE
                    quantity_in_grams := NEW.quantity; 
                END IF;
            
                -- Multiplicando os valores obtidos por (quantity_in_grams / 100) para ajustar à base de 100g/ml
                UPDATE diet SET
                    calories = calories + (quantity_in_grams / 100) * (SELECT calories FROM food WHERE id = NEW.food_id),
                    fat = fat + (quantity_in_grams / 100) * (SELECT fat FROM food WHERE id = NEW.food_id),
                    protein = protein + (quantity_in_grams / 100) * (SELECT protein FROM food WHERE id = NEW.food_id)
                WHERE id = (SELECT diet_id FROM meal WHERE id = NEW.meal_id);
            
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

    await queryRunner.query(`
            CREATE TRIGGER update_diet_nutrition_after_insert_or_update
            AFTER INSERT OR UPDATE ON food_meal
            FOR EACH ROW EXECUTE FUNCTION update_diet_nutrition();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_diet_nutrition_after_insert_or_update ON food_meal;
        `);

    await queryRunner.query(`
            DROP FUNCTION IF EXISTS update_diet_nutrition;
        `);
  }
}
