import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FoodMeal } from "./food_meal.entity";

@Entity("food")
export class Food {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "int" })
  calories: number;

  @Column({ type: "int" })
  fat: number;

  @Column({ type: "int" })
  carbohydrates: number;

  @Column({ type: "int" })
  protein: number;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @OneToMany(() => FoodMeal, (foodMeal) => foodMeal.food, {
    cascade: true,
  })
  foodMeals: FoodMeal[];
}
