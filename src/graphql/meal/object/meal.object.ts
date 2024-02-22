import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MealTimeType } from "src/common/enums/meal-time-type.enum";
import { DietObject } from "src/graphql/diet/object/diet.object";
import { FoodMealObject } from "src/graphql/food-meal/object/food-meal.object";

registerEnumType(MealTimeType, {
  name: "MealTimeType",
});

@ObjectType()
export class MealObject {
  @Field(() => ID)
  id: string;

  @Field(() => DietObject)
  diet: DietObject;

  @Field()
  eatingTime: MealTimeType;

  @Field(() => [FoodMealObject], { nullable: true })
  foodMeals?: FoodMealObject[];
}
