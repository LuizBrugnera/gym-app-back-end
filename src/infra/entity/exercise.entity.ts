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

  @Column({ length: 255, nullable: true, name: "video_url" })
  videoUrl: string | null;

  @Column({ length: 255, nullable: true, name: "image_url" })
  imageUrl: string | null;

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
    name: "muscle_target",
  })
  muscleTarget: MuscleTargetType;

  @Column({ type: "boolean", name: "need_equipment" })
  needEquipment: boolean;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise,
    {
      cascade: true,
    },
  )
  workoutExercises: WorkoutExercise[];
}
