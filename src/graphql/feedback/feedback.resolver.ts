import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackInput } from "./dto/create-feedback.input";
import { UpdateFeedbackInput } from "./dto/update-feedback.input";
import { FeedBackObject } from "./object/feedback.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => FeedBackObject)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Mutation(() => FeedBackObject)
  createFeedback(
    @Args("createFeedbackInput") createFeedbackInput: CreateFeedbackInput,
  ) {
    return this.feedbackService.create(createFeedbackInput);
  }

  @Query(() => [FeedBackObject], { name: "feedbacks" })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Query(() => FeedBackObject, { name: "feedbackById" })
  findOne(@Args("id") id: string) {
    return this.feedbackService.findOneById(id);
  }

  @Mutation(() => FeedBackObject)
  updateFeedback(
    @Args("updateFeedbackInput") updateFeedbackInput: UpdateFeedbackInput,
  ) {
    return this.feedbackService.update(
      updateFeedbackInput.id,
      updateFeedbackInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeFeedback(@Args("id") id: string) {
    return this.feedbackService.remove(id);
  }
}
