import { InputType, Field } from "@nestjs/graphql";
import { StatusType } from "../../../common/enums/status-type.enum";

@InputType()
export class CreateDietInput {
  @Field()
  studentId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dateStart: Date;

  @Field()
  dateEnd: Date;

  @Field()
  status: StatusType;
}
