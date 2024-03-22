import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TrainerService } from "../trainer/trainer.service";
import { StudentService } from "../student/student.service";
import { Student } from "src/infra/entity/student.entity";
import { Trainer } from "src/infra/entity/trainer.entity";

@Injectable()
export class SecurityService {
  constructor(
    private trainerService: TrainerService,
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateStudent(email: string, pass: string): Promise<Student | null> {
    const student = await this.studentService.validateStudent(email, pass);
    if (student) {
      return student;
    }
    return null;
  }

  async validateTrainer(email: string, pass: string): Promise<Trainer | null> {
    const trainer = await this.trainerService.validateTrainer(email, pass);
    if (trainer) {
      return trainer;
    }
    return null;
  }

  loginStudent(student: Student) {
    const payload = {
      id: student.id,
      email: student.email,
      name: student.name,
      sex: student.sex,
      birthdate: student.birthdate,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  loginTrainer(trainer: Trainer) {
    const payload = {
      id: trainer.id,
      email: trainer.email,
      name: trainer.name,
      birthdate: trainer.birthdate,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
