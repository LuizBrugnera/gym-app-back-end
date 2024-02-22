import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../../infra/entity/student.entity";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { TrainerService } from "../trainer/trainer.service";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly trainerService: TrainerService,
  ) {}

  async create(createStudentInput: CreateStudentInput) {
    const trainer = await this.trainerService.findOneById(
      createStudentInput.trainerId,
    );

    if (!trainer) {
      throw new NotFoundException("Trainer not found");
    }

    const student = this.studentRepository.create({
      trainer: trainer,
      name: createStudentInput.name,
      email: createStudentInput.email,
      birthdate: createStudentInput.birthdate,
      sex: createStudentInput.sex,
      passwordHash: bcrypt.hashSync(createStudentInput.password, 8),
    });

    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find({
      relations: [
        "trainer",
        "studentDataChecks",
        "workouts",
        "diets",
        "feedbacks",
      ],
    });
  }

  async findOneById(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: [
        "trainer",
        "studentDataChecks",
        "workouts",
        "diets",
        "feedbacks",
      ],
    });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    return student;
  }

  async update(id: string, updateStudentInput: UpdateStudentInput) {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    if (updateStudentInput.trainerId) {
      const trainer = await this.trainerService.findOneById(
        updateStudentInput.trainerId,
      );
      if (!trainer) {
        throw new NotFoundException("Trainer not found");
      }
    }

    const result = await this.studentRepository.update(id, updateStudentInput);

    if (result.affected === 1) {
      return await this.studentRepository.findOneBy({ id });
    }
    throw new InternalServerErrorException("Student not updated");
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }

    await this.studentRepository.remove(student);

    return { id };
  }
}
