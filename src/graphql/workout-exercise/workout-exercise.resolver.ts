import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { WorkoutExerciseService } from "./workout-exercise.service";
import { CreateWorkoutExerciseInput } from "./dto/create-workout-exercise.input";
import { UpdateWorkoutExerciseInput } from "./dto/update-workout-exercise.input";
import { WorkoutExerciseObject } from "./object/workout-exercise.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => WorkoutExerciseObject)
export class WorkoutExerciseResolver {
  constructor(
    private readonly workoutExerciseService: WorkoutExerciseService,
  ) {}

  @Mutation(() => WorkoutExerciseObject)
  createWorkoutExercise(
    @Args("createWorkoutExerciseInput")
    createWorkoutExerciseInput: CreateWorkoutExerciseInput,
  ) {
    return this.workoutExerciseService.create(createWorkoutExerciseInput);
  }

  @Query(() => [WorkoutExerciseObject], { name: "workoutExercises" })
  findAll() {
    return this.workoutExerciseService.findAll();
  }

  @Query(() => WorkoutExerciseObject, { name: "workoutExerciseById" })
  findOne(@Args("id") id: string) {
    return this.workoutExerciseService.findOneById(id);
  }

  @Mutation(() => WorkoutExerciseObject)
  updateWorkoutExercise(
    @Args("updateWorkoutExerciseInput")
    updateWorkoutExerciseInput: UpdateWorkoutExerciseInput,
  ) {
    return this.workoutExerciseService.update(
      updateWorkoutExerciseInput.id,
      updateWorkoutExerciseInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeWorkoutExercise(@Args("id") id: string) {
    return this.workoutExerciseService.remove(id);
  }
}
