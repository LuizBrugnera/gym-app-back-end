import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateFeedbackInput {
  @Field()
  studentId: string;

  @Field()
  text: string;

  @Field(() => Date)
  date: Date;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  videoUrl?: string;
}
