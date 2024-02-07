import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { StatusType } from "src/common/enums/status-type.enum";
import { WorkoutExercise } from "./workout-exercise.entity";

@Entity("workout")
@Index("idx_workout_student_id_status", ["studentId", "status"])
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.workouts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column({ length: 255 })
  title: string;

  @Column("text", { nullable: true })
  description: string | null;

  @Column({ type: "date" })
  date_start: Date;

  @Column({ type: "date" })
  date_end: Date;

  @Column({
    type: "enum",
    enum: StatusType,
    nullable: false,
  })
  status: StatusType;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
    },
  )
  workoutExercises: WorkoutExercise[];
}
