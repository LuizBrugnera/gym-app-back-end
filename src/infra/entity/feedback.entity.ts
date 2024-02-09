import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { DateTransformer } from "../../common/transformers/date.transformer";

@Entity("feedback")
export class Feedback {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  student_id: string;

  @ManyToOne(() => Student, (student) => student.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column("text")
  text: string;

  @Column({ type: "date", transformer: new DateTransformer() })
  date: Date;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @Column({ length: 255, nullable: true })
  video_url: string | null;
}
