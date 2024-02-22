import { Module } from "@nestjs/common";
import { FoodMealService } from "./food-meal.service";
import { FoodMealResolver } from "./food-meal.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodMeal } from "../../infra/entity/food-meal.entity";
import { MealModule } from "../meal/meal.module";
import { FoodModule } from "../food/food.module";

@Module({
  imports: [TypeOrmModule.forFeature([FoodMeal]), FoodModule, MealModule],
  providers: [FoodMealResolver, FoodMealService],
})
export class FoodMealModule {}
