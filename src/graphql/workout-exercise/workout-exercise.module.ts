import { Module } from "@nestjs/common";
import { WorkoutExerciseService } from "./workout-exercise.service";
import { WorkoutExerciseResolver } from "./workout-exercise.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkoutExercise } from "../../infra/entity/workout-exercise.entity";
import { WorkoutModule } from "../workout/workout.module";
import { ExerciseModule } from "../exercise/exercise.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutExercise]),
    WorkoutModule,
    ExerciseModule,
  ],
  providers: [WorkoutExerciseResolver, WorkoutExerciseService],
})
export class WorkoutExerciseModule {}
