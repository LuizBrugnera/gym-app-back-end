import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDataCheckInput } from "./dto/create-student-data-check.input";
import { UpdateStudentDataCheckInput } from "./dto/update-student-data-check.input";
import { StudentDataCheck } from "../../infra/entity/student-data-check.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";

@Injectable()
export class StudentDataCheckService {
  constructor(
    @InjectRepository(StudentDataCheck)
    private readonly studentDataCheckRepository: Repository<StudentDataCheck>,
    private readonly studentService: StudentService,
  ) {}

  async create(createStudentDataCheckInput: CreateStudentDataCheckInput) {
    const student = await this.studentService.findOneById(
      createStudentDataCheckInput.studentId,
    );

    if (!student) {
      throw new NotFoundException("Student Data Check Input not found");
    }

    const studentDataCheck = this.studentDataCheckRepository.create(
      createStudentDataCheckInput,
    );

    return await this.studentDataCheckRepository.save(studentDataCheck);
  }

  async findAll() {
    return await this.studentDataCheckRepository.find({
      relations: ["student"],
    });
  }

  async findOneById(id: string) {
    return await this.studentDataCheckRepository.findOne({
      where: { id: id },
      relations: ["student"],
    });
  }

  async update(
    id: string,
    updateStudentDataCheckInput: UpdateStudentDataCheckInput,
  ) {
    const studentDataCheck = await this.studentDataCheckRepository.findOneBy({
      id,
    });

    if (!studentDataCheck) {
      throw new NotFoundException("Student Data Check not found");
    }

    if (updateStudentDataCheckInput.studentId) {
      const student = await this.studentService.findOneById(
        updateStudentDataCheckInput.studentId,
      );
      if (!student) throw new NotFoundException("Student not found");
    }

    const result = await this.studentDataCheckRepository.update(
      id,
      updateStudentDataCheckInput,
    );

    if (result.affected === 1) {
      return await this.studentDataCheckRepository.findOneBy({ id });
    }
    throw new InternalServerErrorException("Student Data Check not updated");
  }

  async remove(id: string) {
    const studentDataCheck = await this.studentDataCheckRepository.findOneBy({
      id,
    });

    if (!studentDataCheck) {
      throw new NotFoundException("Student Data Check not found");
    }

    await this.studentDataCheckRepository.remove(studentDataCheck);

    return { id };
  }
}
