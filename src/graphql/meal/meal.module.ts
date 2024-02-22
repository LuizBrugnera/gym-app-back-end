import { Module } from "@nestjs/common";
import { MealService } from "./meal.service";
import { MealResolver } from "./meal.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Meal } from "../../infra/entity/meal.entity";
import { DietModule } from "../diet/diet.module";

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), DietModule],
  providers: [MealResolver, MealService],
  exports: [MealService],
})
export class MealModule {}
