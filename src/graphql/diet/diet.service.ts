import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDietInput } from "./dto/create-diet.input";
import { UpdateDietInput } from "./dto/update-diet.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Diet } from "../../infra/entity/diet.entity";
import { StudentService } from "../student/student.service";

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>,

    private readonly studentService: StudentService,
  ) {}

  async create(createDietInput: CreateDietInput) {
    const student = await this.studentService.findOneById(
      createDietInput.studentId,
    );
    if (!student) throw new NotFoundException("Student not found");

    return await this.dietRepository.save(
      this.dietRepository.create(createDietInput),
    );
  }

  async findAll() {
    return await this.dietRepository.find({
      relations: [
        "student",
        "meals",
        "meals.foodMeals",
        "meals.foodMeals.food",
      ],
    });
  }

  async findOneById(id: string) {
    const diet = await this.dietRepository.findOne({
      relations: [
        "student",
        "meals",
        "meals.foodMeals",
        "meals.foodMeals.food",
      ],
      where: { id },
    });

    if (!diet) throw new NotFoundException("Diet not found");

    return diet;
  }

  async update(id: string, updateDietInput: UpdateDietInput) {
    const diet = await this.dietRepository.findOneBy({ id });
    if (!diet) throw new NotFoundException("Diet not found");

    if (updateDietInput.studentId) {
      const student = await this.studentService.findOneById(
        updateDietInput.studentId,
      );
      if (!student) throw new NotFoundException("Student not found");
    }

    const updated = await this.dietRepository.update(id, updateDietInput);

    if (updated.affected === 1) {
      return await this.dietRepository.findOneBy({ id });
    }

    throw new NotFoundException("Diet not found");
  }

  async remove(id: string) {
    const diet = await this.dietRepository.findOneBy({ id });
    if (!diet) throw new NotFoundException("Diet not found");

    await this.dietRepository.remove(diet);

    return { id };
  }
}
