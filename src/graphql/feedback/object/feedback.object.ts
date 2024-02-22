import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentObject } from "../../student/object/student.object";

@ObjectType()
export class FeedBackObject {
  @Field(() => ID)
  id: string;

  @Field(() => StudentObject)
  student: StudentObject;

  @Field()
  text: string;

  @Field(() => Date)
  date: Date;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  videoUrl?: string;
}
