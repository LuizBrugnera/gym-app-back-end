import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateWorkoutExerciseInput {
  @Field()
  workoutId: string;

  @Field()
  exerciseId: string;

  @Field()
  sets: string;

  @Field()
  rest: number;

  @Field({ nullable: true })
  description?: string;
}
