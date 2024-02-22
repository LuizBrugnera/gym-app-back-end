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

  @Column({ type: "uuid", name: "student_id" })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column("text")
  text: string;

  @Column({ type: "date", transformer: new DateTransformer() })
  date: Date;

  @Column({ length: 255, nullable: true, name: "image_url" })
  imageUrl: string | null;

  @Column({ length: 255, nullable: true, name: "video_url" })
  videoUrl: string | null;
}
