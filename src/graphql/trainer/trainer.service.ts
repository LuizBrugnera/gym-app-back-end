import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateTrainerInput } from "./dto/create-trainer.input";
import { UpdateTrainerInput } from "./dto/update-trainer.input";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Trainer } from "../../infra/entity/trainer.entity";
import bcrypt from "bcryptjs";

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerInput: CreateTrainerInput) {
    const trainer = this.trainerRepository.create({
      name: createTrainerInput.name,
      email: createTrainerInput.email,
      passwordHash: bcrypt.hashSync(createTrainerInput.password, 8),
      birthdate: createTrainerInput.birthdate,
    });

    return await this.trainerRepository.save(trainer);
  }

  async findAll() {
    const results = await this.trainerRepository.find();

    return results;
  }

  async findOneById(id: string) {
    const trainer = await this.trainerRepository.findOneBy({ id });

    if (!trainer) {
      throw new NotFoundException("Trainer not found");
    }
    return trainer;
  }

  async update(id: string, updateTrainerInput: UpdateTrainerInput) {
    const trainer = await this.trainerRepository.findOneBy({ id });

    if (!trainer) {
      throw new NotFoundException("Trainer not found");
    }
    const result = await this.trainerRepository.update(id, updateTrainerInput);

    if (result.affected === 1) {
      return await this.trainerRepository.findOneBy({ id });
    }
    throw new InternalServerErrorException("Trainer not updated");
  }

  async remove(id: string) {
    const trainer = await this.trainerRepository.findOneBy({ id });
    if (!trainer) {
      throw new NotFoundException("Trainer not found");
    }

    await this.trainerRepository.remove(trainer);

    return { id };
  }
}
