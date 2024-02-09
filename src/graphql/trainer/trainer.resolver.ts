import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TrainerService } from "./trainer.service";
import { CreateTrainerInput } from "./dto/create-trainer.input";
import { UpdateTrainerInput } from "./dto/update-trainer.input";
import { TrainerObject } from "./object/trainer.object";

@Resolver(() => TrainerObject)
export class TrainerResolver {
  constructor(private readonly trainerService: TrainerService) {}

  @Mutation(() => TrainerObject)
  createTrainer(
    @Args("createTrainerInput") createTrainerInput: CreateTrainerInput,
  ) {
    return this.trainerService.create(createTrainerInput);
  }

  @Query(() => [TrainerObject], { name: "trainers" })
  findAll() {
    return this.trainerService.findAll();
  }

  @Query(() => TrainerObject, { name: "trainer_by_id" })
  findOneById(@Args("id") id: string) {
    return this.trainerService.findOneById(id);
  }

  @Mutation(() => TrainerObject)
  updateTrainer(
    @Args("updateTrainerInput") updateTrainerInput: UpdateTrainerInput,
  ) {
    return this.trainerService.update(
      updateTrainerInput.id,
      updateTrainerInput,
    );
  }

  @Mutation(() => TrainerObject)
  removeTrainer(@Args("id") id: string) {
    return this.trainerService.remove(id);
  }
}
