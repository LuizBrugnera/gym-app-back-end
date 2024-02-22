import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { WorkoutService } from "./workout.service";
import { CreateWorkoutInput } from "./dto/create-workout.input";
import { UpdateWorkoutInput } from "./dto/update-workout.input";
import { WorkoutObject } from "./object/workout.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => WorkoutObject)
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => WorkoutObject)
  createWorkout(
    @Args("createWorkoutInput") createWorkoutInput: CreateWorkoutInput,
  ) {
    return this.workoutService.create(createWorkoutInput);
  }

  @Query(() => [WorkoutObject], { name: "workouts" })
  findAll() {
    return this.workoutService.findAll();
  }

  @Query(() => WorkoutObject, { name: "workoutById" })
  findOne(@Args("id") id: string) {
    return this.workoutService.findOneById(id);
  }

  @Mutation(() => WorkoutObject)
  updateWorkout(
    @Args("updateWorkoutInput") updateWorkoutInput: UpdateWorkoutInput,
  ) {
    return this.workoutService.update(
      updateWorkoutInput.id,
      updateWorkoutInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeWorkout(@Args("id") id: string) {
    return this.workoutService.remove(id);
  }
}
