import { SexType } from "../../../common/enums/sex-type.enum";
import { CreateStudentDataCheckInput } from "./create-student-data-check.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDataCheckInput extends PartialType(
  CreateStudentDataCheckInput,
) {
  @Field()
  id: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  bf?: number;

  @Field({ nullable: true })
  bodyDensity?: number | null;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  chest?: number | null;

  @Field({ nullable: true })
  axillary?: number | null;

  @Field({ nullable: true })
  tricep?: number | null;

  @Field({ nullable: true })
  subscapular?: number | null;

  @Field({ nullable: true })
  abdominal?: number | null;

  @Field({ nullable: true })
  suprailiac?: number | null;

  @Field({ nullable: true })
  thigh?: number | null;

  @Field({ nullable: true })
  height?: number;

  @Field()
  sex: SexType;
}
