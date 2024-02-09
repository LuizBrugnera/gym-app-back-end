import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { SexType } from "../../../common/enums/sex-type.enum";
import { TrainerObject } from "../../trainer/object/trainer.object";
/*
import { StudentDataCheckObject } from "./student-data-check.object"; // Supondo que você criará um ObjectType para isso
import { WorkoutObject } from "./workout.object"; // Supondo que você criará um ObjectType para isso
import { DietObject } from "./diet.object"; // Supondo que você criará um ObjectType para isso
import { FeedbackObject } from "./feedback.object"; // Supondo que você criará um ObjectType para isso
import { SexType } from "../../common/enums/sex-type.enum";

*/
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

  /*
  @Field(() => [StudentDataCheckObject], { nullable: true }) // Ajuste conforme necessário
  studentDataChecks?: StudentDataCheckObject[];

  @Field(() => [WorkoutObject], { nullable: true }) // Ajuste conforme necessário
  workouts?: WorkoutObject[];

  @Field(() => [DietObject], { nullable: true }) // Ajuste conforme necessário
  diets?: DietObject[];

  @Field(() => [FeedbackObject], { nullable: true }) // Ajuste conforme necessário
  feedbacks?: FeedbackObject[];
*/
}
