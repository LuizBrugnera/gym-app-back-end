import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateFoodMealInput } from "./dto/create-food-meal.input";
import { UpdateFoodMealInput } from "./dto/update-food-meal.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FoodMeal } from "../../infra/entity/food-meal.entity";
import { MealService } from "../meal/meal.service";
import { FoodService } from "../food/food.service";

@Injectable()
export class FoodMealService {
  constructor(
    @InjectRepository(FoodMeal)
    private readonly foodMealRepository: Repository<FoodMeal>,
    private readonly foodService: FoodService,
    private readonly mealService: MealService,
  ) {}

  async create(createFoodMealInput: CreateFoodMealInput) {
    const food = await this.foodService.findOneById(createFoodMealInput.foodId);
    if (!food) throw new NotFoundException("Food not found");

    const meal = await this.mealService.findOneById(createFoodMealInput.mealId);
    if (!meal) throw new NotFoundException("Meal not found");

    return await this.foodMealRepository.save(
      this.foodMealRepository.create(createFoodMealInput),
    );
  }

  async findAll() {
    return await this.foodMealRepository.find();
  }

  async findOne(id: string) {
    const foodmeal = await this.foodMealRepository.findOneBy({ id });
    if (!foodmeal) throw new NotFoundException("Food Meal not found");

    return foodmeal;
  }

  async update(id: string, updateFoodMealInput: UpdateFoodMealInput) {
    if (updateFoodMealInput.foodId) {
      const food = await this.foodService.findOneById(
        updateFoodMealInput.foodId,
      );
      if (!food) throw new NotFoundException("Food not found");
    }

    if (updateFoodMealInput.mealId) {
      const meal = await this.mealService.findOneById(
        updateFoodMealInput.mealId,
      );
      if (!meal) throw new NotFoundException("Meal not found");
    }

    const updated = await this.foodMealRepository.update(
      id,
      updateFoodMealInput,
    );

    if (updated.affected === 1) {
      return await this.foodMealRepository.findOneBy({ id });
    }

    throw new InternalServerErrorException("Food Meal not updated");
  }

  async remove(id: string) {
    const foodmeal = await this.foodMealRepository.findOneBy({ id });
    if (!foodmeal) throw new NotFoundException("Food Meal not found");

    await this.foodMealRepository.remove(foodmeal);

    return { id };
  }
}
