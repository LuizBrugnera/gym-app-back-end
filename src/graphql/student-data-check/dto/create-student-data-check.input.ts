import { Field, InputType, Int } from "@nestjs/graphql";
import { SexType } from "../../../common/enums/sex-type.enum";

@InputType()
export class CreateStudentDataCheckInput {
  @Field()
  studentId: string;

  @Field()
  date: Date;

  @Field(() => Int)
  age: number;

  @Field()
  bf: number;

  @Field({ nullable: true })
  bodyDensity?: number | null;

  @Field()
  weight: number;

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

  @Field()
  height: number;

  @Field()
  sex: SexType;
}
