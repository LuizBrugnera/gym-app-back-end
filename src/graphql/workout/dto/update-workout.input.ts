import { StatusType } from "../../../common/enums/status-type.enum";
import { CreateWorkoutInput } from "./create-workout.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateWorkoutInput extends PartialType(CreateWorkoutInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  dateStart?: Date;

  @Field(() => Date, { nullable: true })
  dateEnd?: Date;

  @Field({ nullable: true })
  status?: StatusType;
}
