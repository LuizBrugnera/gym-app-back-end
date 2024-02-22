import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateFoodInput } from "./dto/create-food.input";
import { UpdateFoodInput } from "./dto/update-food.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Food } from "../../infra/entity/food.entity";
import { Repository } from "typeorm";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}
  async create(createFoodInput: CreateFoodInput) {
    return await this.foodRepository.save(
      this.foodRepository.create(createFoodInput),
    );
  }

  async findAll() {
    return await this.foodRepository.find();
  }

  async findOneById(id: string) {
    const food = await this.foodRepository.findOneBy({ id });
    return food;
  }

  async update(id: string, updateFoodInput: UpdateFoodInput) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) throw new NotFoundException("Food not found");

    const updated = await this.foodRepository.update(id, updateFoodInput);

    if (updated.affected === 1) {
      return await this.foodRepository.findOneBy({ id });
    }

    throw new InternalServerErrorException("Food not found");
  }

  async remove(id: string) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) throw new NotFoundException("Food not found");

    await this.foodRepository.remove(food);

    return { id };
  }
}
