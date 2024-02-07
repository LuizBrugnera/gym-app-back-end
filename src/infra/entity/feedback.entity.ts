import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity";

@Entity("feedback")
export class Feedback {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column("text")
  text: string;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @Column({ length: 255, nullable: true })
  video_url: string | null;
}
