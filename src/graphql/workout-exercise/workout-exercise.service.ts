import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkoutExerciseInput } from "./dto/create-workout-exercise.input";
import { UpdateWorkoutExerciseInput } from "./dto/update-workout-exercise.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkoutExercise } from "../../infra/entity/workout-exercise.entity";
import { WorkoutService } from "../workout/workout.service";
import { ExerciseService } from "../exercise/exercise.service";

@Injectable()
export class WorkoutExerciseService {
  constructor(
    @InjectRepository(WorkoutExercise)
    private readonly workoutExerciseRepository: Repository<WorkoutExercise>,
    private readonly workoutService: WorkoutService,
    private readonly exerciseService: ExerciseService,
  ) {}

  async create(createWorkoutExerciseInput: CreateWorkoutExerciseInput) {
    const workout = await this.workoutService.findOneById(
      createWorkoutExerciseInput.workoutId,
    );
    const exercise = await this.exerciseService.findOneById(
      createWorkoutExerciseInput.exerciseId,
    );
    if (!workout) throw new NotFoundException("Workout not found");
    if (!exercise) throw new NotFoundException("Exercise not found");

    return await this.workoutExerciseRepository.save(
      this.workoutExerciseRepository.create(createWorkoutExerciseInput),
    );
  }

  async findAll() {
    return await this.workoutExerciseRepository.find();
  }

  async findOneById(id: string) {
    const workoutExercise = await this.workoutExerciseRepository.findOneBy({
      id,
    });
    if (!workoutExercise)
      throw new NotFoundException("WorkoutExercise not found");
    return workoutExercise;
  }

  async update(
    id: string,
    updateWorkoutExerciseInput: UpdateWorkoutExerciseInput,
  ) {
    const workoutExercise = await this.workoutExerciseRepository.findOneBy({
      id,
    });
    if (!workoutExercise)
      throw new NotFoundException("WorkoutExercise not found");

    if (updateWorkoutExerciseInput.workoutId) {
      const workout = await this.workoutService.findOneById(
        updateWorkoutExerciseInput.workoutId,
      );
      if (!workout) throw new NotFoundException("Workout not found");
    }

    if (updateWorkoutExerciseInput.exerciseId) {
      const exercise = await this.exerciseService.findOneById(
        updateWorkoutExerciseInput.exerciseId,
      );
      if (!exercise) throw new NotFoundException("Exercise not found");
    }

    const updated = await this.workoutExerciseRepository.update(
      id,
      updateWorkoutExerciseInput,
    );

    if (updated.affected === 1) {
      return await this.workoutExerciseRepository.findOneBy({ id });
    }
    throw new NotFoundException("WorkoutExercise not updated");
  }

  async remove(id: string) {
    const workoutExercise = await this.workoutExerciseRepository.findOneBy({
      id,
    });
    if (!workoutExercise)
      throw new NotFoundException("WorkoutExercise not found");

    await this.workoutExerciseRepository.remove(workoutExercise);

    return { id };
  }
}
