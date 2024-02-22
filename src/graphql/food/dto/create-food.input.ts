import { InputType, Float, Field } from "@nestjs/graphql";

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field(() => Float)
  calories: number;

  @Field(() => Float)
  fat: number;

  @Field(() => Float)
  carbohydrates: number;

  @Field(() => Float)
  protein: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
