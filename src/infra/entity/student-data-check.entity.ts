import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Student } from "./student.entity";
import { SexType } from "src/common/enums/sex-type.enum";

@Entity("student_data_check")
@Index("idx_student_data_check_student_id", ["studentId"])
export class StudentDataCheck {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.studentDataChecks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "numeric" })
  bf: number; // Body fat

  @Column({ type: "numeric", nullable: true })
  body_density: number | null;

  @Column({ type: "numeric" })
  weight: number;

  @Column({ type: "numeric", nullable: true })
  chest: number | null;

  @Column({ type: "numeric", nullable: true })
  axillary: number | null;

  @Column({ type: "numeric", nullable: true })
  tricep: number | null;

  @Column({ type: "numeric", nullable: true })
  subscapular: number | null;

  @Column({ type: "numeric", nullable: true })
  abdominal: number | null;

  @Column({ type: "numeric", nullable: true })
  suprailiac: number | null;

  @Column({ type: "numeric", nullable: true })
  thigh: number | null;

  @Column({ type: "numeric" })
  height: number;

  @Column({
    type: "enum",
    enum: SexType,
  })
  sex: SexType;
}
