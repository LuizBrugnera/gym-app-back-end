import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ExerciseService } from "./exercise.service";
import { CreateExerciseInput } from "./dto/create-exercise.input";
import { UpdateExerciseInput } from "./dto/update-exercise.input";
import { ExerciseObject } from "./object/exercise.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => ExerciseObject)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => ExerciseObject)
  createExercise(
    @Args("createExerciseInput") createExerciseInput: CreateExerciseInput,
  ) {
    return this.exerciseService.create(createExerciseInput);
  }

  @Query(() => [ExerciseObject], { name: "exercises" })
  findAll() {
    return this.exerciseService.findAll();
  }

  @Query(() => ExerciseObject, { name: "exerciseById" })
  findOne(@Args("id") id: string) {
    return this.exerciseService.findOneById(id);
  }

  @Mutation(() => ExerciseObject)
  updateExercise(
    @Args("updateExerciseInput") updateExerciseInput: UpdateExerciseInput,
  ) {
    return this.exerciseService.update(
      updateExerciseInput.id,
      updateExerciseInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeExercise(@Args("id") id: string) {
    return this.exerciseService.remove(id);
  }
}
