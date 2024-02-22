import { Module } from "@nestjs/common";
import { FoodService } from "./food.service";
import { FoodResolver } from "./food.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Food } from "../../infra/entity/food.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodResolver, FoodService],
  exports: [FoodService],
})
export class FoodModule {}
