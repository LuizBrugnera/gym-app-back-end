import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateExerciseInput } from "./dto/create-exercise.input";
import { UpdateExerciseInput } from "./dto/update-exercise.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Exercise } from "../../infra/entity/exercise.entity";
import { Repository } from "typeorm";

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly studentRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseInput: CreateExerciseInput) {
    const exercise = this.studentRepository.create(createExerciseInput);

    return await this.studentRepository.save(exercise);
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOneById(id: string) {
    const exercise = await this.studentRepository.findOneBy({ id });
    if (!exercise) throw new NotFoundException("Exercise not found");
    return exercise;
  }

  async update(id: string, updateExerciseInput: UpdateExerciseInput) {
    const exercise = await this.studentRepository.findOneBy({ id });

    if (!exercise) throw new NotFoundException("Exercise not found");

    const result = await this.studentRepository.update(id, updateExerciseInput);

    if (result.affected === 1)
      return await this.studentRepository.findOneBy({ id });

    throw new NotFoundException("Exercise not updated");
  }

  async remove(id: string) {
    const exercise = await this.studentRepository.findOneBy({ id });

    if (!exercise) throw new NotFoundException("Exercise not found");

    await this.studentRepository.remove(exercise);

    return { id };
  }
}
