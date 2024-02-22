import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteObject {
  @Field(() => ID)
  id: string;
}
