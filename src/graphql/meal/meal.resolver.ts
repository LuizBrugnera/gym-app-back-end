import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { MealService } from "./meal.service";
import { CreateMealInput } from "./dto/create-meal.input";
import { UpdateMealInput } from "./dto/update-meal.input";
import { MealObject } from "./object/meal.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => MealObject)
export class MealResolver {
  constructor(private readonly mealService: MealService) {}

  @Mutation(() => MealObject)
  createMeal(@Args("createMealInput") createMealInput: CreateMealInput) {
    return this.mealService.create(createMealInput);
  }

  @Query(() => [MealObject], { name: "meals" })
  findAll() {
    return this.mealService.findAll();
  }

  @Query(() => MealObject, { name: "mealById" })
  findOne(@Args("id") id: string) {
    return this.mealService.findOneById(id);
  }

  @Mutation(() => MealObject)
  updateMeal(@Args("updateMealInput") updateMealInput: UpdateMealInput) {
    return this.mealService.update(updateMealInput.id, updateMealInput);
  }

  @Mutation(() => DeleteObject)
  removeMeal(@Args("id") id: string) {
    return this.mealService.remove(id);
  }
}
