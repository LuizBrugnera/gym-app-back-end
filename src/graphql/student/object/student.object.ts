import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { SexType } from "../../../common/enums/sex-type.enum";
import { TrainerObject } from "../../trainer/object/trainer.object";
import { StudentDataCheckObject } from "../../student-data-check/object/student-data-check.object";
import { FeedBackObject } from "../../feedback/object/feedback.object";
import { DietObject } from "../../diet/object/diet.object";
import { WorkoutObject } from "../../workout/object/workout.object";

registerEnumType(SexType, {
  name: "SexType",
});

@ObjectType()
export class StudentObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  birthdate: Date;

  @Field(() => SexType)
  sex: SexType;

  @Field(() => TrainerObject)
  trainer: TrainerObject;

  @Field(() => [StudentDataCheckObject], { nullable: true })
  studentDataChecks?: StudentDataCheckObject[];

  @Field(() => [WorkoutObject], { nullable: true })
  workouts?: WorkoutObject[];

  @Field(() => [DietObject], { nullable: true })
  diets?: DietObject[];

  @Field(() => [FeedBackObject], { nullable: true })
  feedbacks?: FeedBackObject[];
}
