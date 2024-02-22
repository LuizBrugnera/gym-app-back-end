import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ExerciseObject } from "../../exercise/object/exercise.object";
import { WorkoutObject } from "../../workout/object/workout.object";

@ObjectType()
export class WorkoutExerciseObject {
  @Field(() => ID)
  id: string;

  @Field(() => WorkoutObject)
  workout: WorkoutObject;

  @Field(() => ExerciseObject)
  exercise: ExerciseObject;

  @Field()
  sets: string;

  @Field()
  rest: string;

  @Field({ nullable: true })
  description?: string;
}
