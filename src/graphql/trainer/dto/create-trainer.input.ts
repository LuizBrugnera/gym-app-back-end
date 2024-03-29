import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateTrainerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  birthdate: Date;
}
