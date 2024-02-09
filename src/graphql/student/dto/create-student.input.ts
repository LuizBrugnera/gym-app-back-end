import { InputType, Field } from "@nestjs/graphql";
import { SexType } from "../../../common/enums/sex-type.enum";

@InputType()
export class CreateStudentInput {
  @Field()
  trainerId: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  sex: SexType;

  @Field()
  password: string;

  @Field()
  birthdate: Date;
}
