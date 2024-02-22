import { SexType } from "../../../common/enums/sex-type.enum";
import { CreateStudentInput } from "./create-student.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  sex?: SexType;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  birthdate?: Date;
}
