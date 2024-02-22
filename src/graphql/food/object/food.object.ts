import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class FoodObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  calories: number;

  @Field()
  fat: number;

  @Field()
  carbohydrates: number;

  @Field()
  protein: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
