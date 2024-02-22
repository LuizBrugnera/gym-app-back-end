import { InputType, Field } from "@nestjs/graphql";
import { StatusType } from "../../../common/enums/status-type.enum";

@InputType()
export class CreateWorkoutInput {
  @Field()
  studentId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  dateStart: Date;

  @Field(() => Date)
  dateEnd: Date;

  @Field()
  status: StatusType;
}
