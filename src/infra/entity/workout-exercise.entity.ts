import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Workout } from "./workout.entity";
import { Exercise } from "./exercise.entity";

@Entity("workout_exercise")
@Index("idx_workout_exercise_workout_id", ["workout_id"])
export class WorkoutExercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "workout_id" })
  workoutId: string;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workout_id" })
  workout: Workout;

  @Column({ type: "uuid", name: "exercise_id" })
  exerciseId: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "exercise_id" })
  exercise: Exercise;

  @Column({ type: "int" })
  sets: number;

  @Column({ type: "interval" })
  rest: any; // Interval

  @Column("text", { nullable: true })
  description: string | null;
}
