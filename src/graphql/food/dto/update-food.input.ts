import { CreateFoodInput } from "./create-food.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  calories?: number;

  @Field({ nullable: true })
  fat?: number;

  @Field({ nullable: true })
  carbohydrates?: number;

  @Field({ nullable: true })
  protein?: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
