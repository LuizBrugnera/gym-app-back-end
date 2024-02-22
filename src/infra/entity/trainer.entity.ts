import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "./student.entity";
import { DateTransformer } from "../../common/transformers/date.transformer";

@Entity("trainer")
export class Trainer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: "password_hash", type: "char", length: 60 })
  passwordHash: string;

  @Column({ type: "date", transformer: new DateTransformer() })
  birthdate: Date;

  @OneToMany(() => Student, (student) => student.trainer, {
    cascade: true,
    onDelete: "CASCADE",
  })
  students: Student[];
}
