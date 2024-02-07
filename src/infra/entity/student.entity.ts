import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from "typeorm";
import { Trainer } from "./trainer.entity";
import { StudentDataCheck } from "./student-data-check.entity";
import { Workout } from "./workout.entity";
import { Diet } from "./diet.entity";
import { Feedback } from "./feedback.entity";

@Entity("student")
@Index("idx_student_trainer_id", ["trainerId"])
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  trainerId: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.students)
  @JoinColumn({ name: "trainer_id" })
  trainer: Trainer;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: "char", length: 60 })
  password_hash: string;

  @Column({ type: "date" })
  birthdate: Date;

  @OneToMany(
    () => StudentDataCheck,
    (studentDataCheck) => studentDataCheck.student,
    {
      cascade: true,
      onDelete: "CASCADE",
    },
  )
  studentDataChecks: StudentDataCheck[];

  @OneToMany(() => Workout, (workouts) => workouts.student, {
    cascade: true,
    onDelete: "CASCADE",
  })
  workouts: Workout[];

  @OneToMany(() => Diet, (diets) => diets.student, {
    cascade: true,
    onDelete: "CASCADE",
  })
  diets: Diet[];

  @OneToMany(() => Feedback, (feedback) => feedback.student, {
    cascade: true,
  })
  feedbacks: Feedback[];
}
