import { InputType, Int, Field } from "@nestjs/graphql";
import { MeasureType } from "../../../common/enums/measure-type.enum";

@InputType()
export class CreateFoodMealInput {
  @Field()
  mealId: string;

  @Field()
  foodId: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  measure: MeasureType;
}
