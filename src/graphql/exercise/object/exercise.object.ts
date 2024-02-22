import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ExerciseType } from "../../../common/enums/exercise-type.enum";
import { MuscleTargetType } from "../../../common/enums/muscle-target-type.enum";

registerEnumType(MuscleTargetType, {
  name: "MuscleTargetType",
});
registerEnumType(ExerciseType, {
  name: "ExerciseType",
});

@ObjectType()
export class ExerciseObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => ExerciseType)
  type: ExerciseType;

  @Field(() => MuscleTargetType)
  muscleTarget: MuscleTargetType;

  @Field()
  needEquipment: boolean;
}
