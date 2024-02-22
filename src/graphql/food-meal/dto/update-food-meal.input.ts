import { MeasureType } from "../../../common/enums/measure-type.enum";
import { CreateFoodMealInput } from "./create-food-meal.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateFoodMealInput extends PartialType(CreateFoodMealInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  foodId?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field({ nullable: true })
  measure?: MeasureType;

  @Field({ nullable: true })
  mealId?: string;
}
