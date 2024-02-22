import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FoodMeal } from "./food-meal.entity";

@Entity("food")
export class Food {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "float" })
  calories: number;

  @Column({ type: "float" })
  fat: number;

  @Column({ type: "float" })
  carbohydrates: number;

  @Column({ type: "float" })
  protein: number;

  @Column({ name: "image_url", length: 255, nullable: true })
  imageUrl: string | null;

  @OneToMany(() => FoodMeal, (foodMeal) => foodMeal.food, {
    cascade: true,
  })
  foodMeals: FoodMeal[];
}
