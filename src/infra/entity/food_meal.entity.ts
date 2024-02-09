import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Meal } from "./meal.entity";
import { Food } from "./food.entity";

@Entity("food_meal")
export class FoodMeal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  meal_id: string;

  @ManyToOne(() => Meal, (meal) => meal.foodMeals, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "meal_id" })
  meal: Meal;

  @Column({ type: "uuid" })
  food_id: string;

  @ManyToOne(() => Food, (food) => food.foodMeals, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "food_id" })
  food: Food;

  @Column({ type: "int" })
  quantity: number;

  @Column({ length: 255 })
  measure: string;
}
