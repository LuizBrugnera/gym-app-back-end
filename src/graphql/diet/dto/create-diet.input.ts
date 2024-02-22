import { InputType, Float, Field } from "@nestjs/graphql";
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

  @Field(() => Float, { nullable: true })
  calories?: number;

  @Field(() => Float, { nullable: true })
  fat?: number;

  @Field(() => Float, { nullable: true })
  carbohydrates?: number;

  @Field(() => Float, { nullable: true })
  protein?: number;
}
