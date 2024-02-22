import { CreateWorkoutExerciseInput } from "./create-workout-exercise.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

@InputType()
export class UpdateWorkoutExerciseInput extends PartialType(
  CreateWorkoutExerciseInput,
) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  workoutId?: string;

  @Field({ nullable: true })
  exerciseId?: string;

  @Field({ nullable: true })
  sets?: string;

  @Field({ nullable: true })
  rest?: number;

  @Field({ nullable: true })
  description?: string;
}
