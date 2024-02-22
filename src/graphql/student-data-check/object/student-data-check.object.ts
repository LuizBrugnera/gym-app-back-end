import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { SexType } from "../../../common/enums/sex-type.enum";
import { StudentObject } from "../../student/object/student.object";

registerEnumType(SexType, {
  name: "SexType",
});

@ObjectType()
export class StudentDataCheckObject {
  @Field(() => ID)
  id: string;

  @Field(() => StudentObject)
  student: StudentObject;

  @Field()
  date: Date;

  @Field()
  age: number;

  @Field()
  bf: number;

  @Field({ nullable: true })
  bodyDensity: number | null;

  @Field()
  weight: number;

  @Field({ nullable: true })
  chest: number | null;

  @Field({ nullable: true })
  axillary: number | null;

  @Field({ nullable: true })
  tricep: number | null;

  @Field({ nullable: true })
  subscapular: number | null;

  @Field({ nullable: true })
  abdominal: number | null;

  @Field({ nullable: true })
  suprailiac: number | null;

  @Field({ nullable: true })
  thigh: number | null;

  @Field()
  height: number;

  @Field()
  sex: SexType;
}
