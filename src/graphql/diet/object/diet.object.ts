import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { StatusType } from "../../../common/enums/status-type.enum";
import { MealObject } from "../../meal/object/meal.object";
import { StudentObject } from "../../student/object/student.object";

registerEnumType(StatusType, {
  name: "StatusType",
});

@ObjectType()
export class DietObject {
  @Field(() => ID)
  id: string;

  @Field(() => StudentObject)
  student: StudentObject;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dateStart: Date;

  @Field()
  dateEnd: Date;

  @Field()
  status: StatusType;

  @Field({ nullable: true })
  calories?: number;

  @Field({ nullable: true })
  fat?: number;

  @Field({ nullable: true })
  carbohydrates?: number;

  @Field({ nullable: true })
  protein?: number;

  @Field(() => [MealObject], { nullable: true })
  meals?: MealObject[];
}
