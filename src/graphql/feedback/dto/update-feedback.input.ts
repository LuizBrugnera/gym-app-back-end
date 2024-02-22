import { CreateFeedbackInput } from "./create-feedback.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateFeedbackInput extends PartialType(CreateFeedbackInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  videoUrl?: string;
}
