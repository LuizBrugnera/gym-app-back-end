import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Diet } from "./diet.entity";
import { MealTimeType } from "src/common/enums/meal-time-type";
import { FoodMeal } from "./food_meal.entity";

@Entity("meal")
export class Meal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  dietId: string;

  @ManyToOne(() => Diet, (diet) => diet.meals, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "diet_id" })
  diet: Diet;

  @Column({
    type: "enum",
    enum: MealTimeType,
  })
  eating_time: MealTimeType;

  @OneToMany(() => FoodMeal, (foodMeal) => foodMeal.meal, {
    cascade: true,
  })
  foodMeals: FoodMeal[];
}
