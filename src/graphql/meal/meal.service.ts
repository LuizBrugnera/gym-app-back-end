import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateMealInput } from "./dto/create-meal.input";
import { UpdateMealInput } from "./dto/update-meal.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Meal } from "../../infra/entity/meal.entity";
import { Repository } from "typeorm";
import { DietService } from "../diet/diet.service";

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,

    private readonly dietService: DietService,
  ) {}

  async create(createMealInput: CreateMealInput) {
    const diet = await this.dietService.findOneById(createMealInput.dietId);
    if (!diet) throw new NotFoundException("Diet not found");

    return await this.mealRepository.save(
      this.mealRepository.create(createMealInput),
    );
  }

  async findAll() {
    return await this.mealRepository.find({
      relations: ["foodMeals", "foodMeals.food"],
    });
  }

  async findOneById(id: string) {
    const meal = await this.mealRepository.findOne({
      where: { id },
      relations: ["foodMeals", "foodMeals.food"],
    });

    if (!meal) throw new NotFoundException("Meal not found");

    return meal;
  }

  async update(id: string, updateMealInput: UpdateMealInput) {
    const meal = await this.mealRepository.findOneBy({ id });
    if (!meal) throw new NotFoundException("Meal not found");

    if (updateMealInput.dietId) {
      const diet = await this.dietService.findOneById(updateMealInput.dietId);
      if (!diet) throw new NotFoundException("Diet not found");
    }

    const updated = await this.mealRepository.update(id, updateMealInput);

    if (updated.affected === 1) {
      return await this.mealRepository.findOneBy({ id });
    }

    throw new InternalServerErrorException("Meal not updated");
  }

  async remove(id: string) {
    const meal = await this.mealRepository.findOneBy({ id });
    if (!meal) throw new NotFoundException("Meal not found");

    await this.mealRepository.remove(meal);

    return { id };
  }
}
