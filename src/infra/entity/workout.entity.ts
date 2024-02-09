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
import { StatusType } from "../../common/enums/status-type.enum";
import { WorkoutExercise } from "./workout-exercise.entity";
import { DateTransformer } from "../../common/transformers/date.transformer";

@Entity("workout")
@Index("idx_workout_student_id_status", ["studentId", "status"])
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "student_id" })
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

  @Column({ type: "date", transformer: new DateTransformer() })
  date_start: Date;

  @Column({ type: "date", transformer: new DateTransformer() })
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
