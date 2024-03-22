import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginTrainerInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
