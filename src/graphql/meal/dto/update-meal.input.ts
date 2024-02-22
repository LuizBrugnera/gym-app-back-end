import { MealTimeType } from "../../../common/enums/meal-time-type.enum";
import { CreateMealInput } from "./create-meal.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMealInput extends PartialType(CreateMealInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  dietId?: string;

  @Field({ nullable: true })
  eatingTime?: MealTimeType;

  /*
  @Field(() => [CreateFoodMealInput], { nullable: true })
  foodMeals?: CreateFoodMealInput[];
  */
}
