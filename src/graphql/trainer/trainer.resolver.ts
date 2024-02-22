import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { TrainerService } from "./trainer.service";
import { CreateTrainerInput } from "./dto/create-trainer.input";
import { UpdateTrainerInput } from "./dto/update-trainer.input";
import { TrainerObject } from "./object/trainer.object";
import { DeleteObject } from "../../common/objects/delete.object";

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

  @Query(() => TrainerObject, { name: "trainerById" })
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

  @Mutation(() => DeleteObject)
  removeTrainer(@Args("id") id: string) {
    return this.trainerService.remove(id);
  }
}
