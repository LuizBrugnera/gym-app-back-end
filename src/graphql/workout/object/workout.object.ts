import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { StatusType } from "../../../common/enums/status-type.enum";
import { StudentObject } from "../../student/object/student.object";
import { WorkoutExerciseObject } from "../../workout-exercise/object/workout-exercise.object";

registerEnumType(StatusType, {
  name: "StatusType",
});

@ObjectType()
export class WorkoutObject {
  @Field()
  id: string;

  @Field(() => StudentObject)
  student: StudentObject;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  dateStart: Date;

  @Field(() => Date)
  dateEnd: Date;

  @Field(() => StatusType)
  status: StatusType;

  @Field(() => [WorkoutExerciseObject], { nullable: true })
  workoutExercises?: WorkoutExerciseObject[];
}
