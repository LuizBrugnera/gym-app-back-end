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
import { StatusType } from "../../common/enums/status-type.enum";
import { Meal } from "./meal.entity";
import { DateTransformer } from "../../common/transformers/date.transformer";

@Entity("diet")
@Index("idx_diet_student_id_status", ["studentId", "status"])
export class Diet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "student_id" })
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

  @Column({
    type: "date",
    transformer: new DateTransformer(),
    name: "date_start",
  })
  dateStart: Date;

  @Column({
    type: "date",
    transformer: new DateTransformer(),
    name: "date_end",
  })
  dateEnd: Date;

  @Column({
    type: "enum",
    enum: StatusType,
  })
  status: StatusType;

  @Column({ type: "float", nullable: true })
  calories: number | null;

  @Column({ type: "float", nullable: true })
  fat: number | null;

  @Column({ type: "float", nullable: true })
  carbohydrates: number | null;

  @Column({ type: "float", nullable: true })
  protein: number | null;

  @OneToMany(() => Meal, (meal) => meal.diet, {
    cascade: true,
  })
  meals: Meal[];
}
