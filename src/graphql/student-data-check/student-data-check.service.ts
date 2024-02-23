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
import { GymCalcules } from "../../common/helpers/gym-calcules.helper";

@Injectable()
export class StudentDataCheckService {
  constructor(
    @InjectRepository(StudentDataCheck)
    private readonly studentDataCheckRepository: Repository<StudentDataCheck>,
    private readonly studentService: StudentService,
  ) {}

  async create(createStudentDataCheckInput: CreateStudentDataCheckInput) {
    const {
      studentId,
      age,
      bf,
      date,
      height,
      sex,
      weight,
      abdominal,
      axillary,
      bodyDensity,
      chest,
      subscapular,
      suprailiac,
      thigh,
      tricep,
      imc,
    } = createStudentDataCheckInput;
    const student = await this.studentService.findOneById(studentId);

    if (!student) {
      throw new NotFoundException("Student Data Check Input not found");
    }

    let newBf, newBodyDensity, newImc;

    if (
      chest &&
      axillary &&
      tricep &&
      subscapular &&
      abdominal &&
      suprailiac &&
      thigh &&
      age &&
      sex &&
      !bf
    ) {
      newBodyDensity = GymCalcules.calculateBodyDensity({
        chest,
        axillary,
        tricep,
        subscapular,
        abdominal,
        suprailiac,
        thigh,
        age,
        sex,
      });

      newBf = GymCalcules.calculateBodyFat(newBodyDensity);
    }

    if (imc) {
      newImc = GymCalcules.calculateIMC({ weight, height });
    }

    const newCheck = {
      studentId,
      age,
      bf: newBf || bf,
      date,
      height,
      sex,
      weight,
      abdominal,
      axillary,
      bodyDensity: newBodyDensity || bodyDensity,
      chest,
      subscapular,
      suprailiac,
      thigh,
      tricep,
      imc: newImc || imc,
    };
    const studentDataCheck = this.studentDataCheckRepository.create(newCheck);

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
