import { CreateExerciseInput } from "./create-exercise.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";
import { ExerciseType } from "../../../common/enums/exercise-type.enum";
import { MuscleTargetType } from "../../../common/enums/muscle-target-type.enum";

@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  type?: ExerciseType;

  @Field({ nullable: true })
  muscleTarget?: MuscleTargetType;

  @Field({ nullable: true })
  needEquipment?: boolean;
}
