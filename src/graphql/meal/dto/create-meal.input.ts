import { InputType, Field } from "@nestjs/graphql";
import { MealTimeType } from "../../../common/enums/meal-time-type.enum";

@InputType()
export class CreateMealInput {
  @Field()
  dietId: string;

  @Field()
  eatingTime: MealTimeType;
}
