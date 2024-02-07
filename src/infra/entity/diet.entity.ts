import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from "typeorm";
import { Student } from "./student.entity";
import { StatusType } from "src/common/enums/status-type.enum";
import { Meal } from "./meal.entity";

@Entity("diet")
@Index("idx_diet_student_id_status", ["studentId", "status"])
export class Diet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.diets, {
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
  })
  status: StatusType;

  @Column({ type: "int", nullable: true })
  calories: number | null;

  @Column({ type: "int", nullable: true })
  fat: number | null;

  @Column({ type: "int", nullable: true })
  carbohydrates: number | null;

  @Column({ type: "int", nullable: true })
  protein: number | null;

  @OneToMany(() => Meal, (meal) => meal.diet, {
    cascade: true,
  })
  meals: Meal[];
}
