import { CreateTrainerInput } from "./create-trainer.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateTrainerInput extends PartialType(CreateTrainerInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  birthdate?: Date;
}
