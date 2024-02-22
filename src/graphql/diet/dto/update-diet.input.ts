import { StatusType } from "../../../common/enums/status-type.enum";
import { CreateDietInput } from "./create-diet.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDietInput extends PartialType(CreateDietInput) {
  @Field()
  id: string;

  @Field()
  studentId: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dateStart?: Date;

  @Field({ nullable: true })
  dateEnd?: Date;

  @Field({ nullable: true })
  status?: StatusType;

  @Field({ nullable: true })
  calories?: number;

  @Field({ nullable: true })
  fat?: number;

  @Field({ nullable: true })
  carbohydrates?: number;

  @Field({ nullable: true })
  protein?: number;
}
