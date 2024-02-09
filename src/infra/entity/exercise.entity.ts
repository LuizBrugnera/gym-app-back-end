import { ExerciseType } from "../../common/enums/exercise-type.enum";
import { MuscleTargetType } from "../../common/enums/muscle-target-type.enum";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutExercise } from "./workout-exercise.entity";

@Entity("exercise")
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column("text", { nullable: true })
  description: string | null;

  @Column({ length: 255, nullable: true })
  video_url: string | null;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @Column({
    type: "enum",
    enum: ExerciseType,
    nullable: false,
  })
  type: ExerciseType;

  @Column({
    type: "enum",
    enum: MuscleTargetType,
    nullable: false,
  })
  muscle_target: MuscleTargetType;

  @Column({ type: "boolean" })
  need_equipment: boolean;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise,
    {
      cascade: true,
    },
  )
  workoutExercises: WorkoutExercise[];
}
