import { InputType, Field } from "@nestjs/graphql";
import { ExerciseType } from "../../../common/enums/exercise-type.enum";
import { MuscleTargetType } from "../../../common/enums/muscle-target-type.enum";

@InputType()
export class CreateExerciseInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  type: ExerciseType;

  @Field()
  muscleTarget: MuscleTargetType;

  @Field()
  needEquipment: boolean;
}
