import { ObjectType, Field, ID } from "@nestjs/graphql";
import { StudentObject } from "../../student/object/student.object";

@ObjectType()
export class TrainerObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  birthdate: Date;

  @Field(() => [StudentObject], { nullable: "itemsAndList" })
  students: StudentObject[];
}
