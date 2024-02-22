import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MeasureType } from "src/common/enums/measure-type.enum";
import { FoodObject } from "src/graphql/food/object/food.object";
import { MealObject } from "src/graphql/meal/object/meal.object";

registerEnumType(MeasureType, {
  name: "MeasureType",
});

@ObjectType()
export class FoodMealObject {
  @Field(() => ID)
  id: string;

  @Field(() => MealObject)
  meal: MealObject;

  @Field(() => FoodObject)
  food: FoodObject;

  @Field()
  quantity: number;

  @Field()
  measure: MeasureType;
}
