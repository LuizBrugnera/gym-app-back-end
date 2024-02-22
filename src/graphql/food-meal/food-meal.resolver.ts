import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { FoodMealService } from "./food-meal.service";
import { CreateFoodMealInput } from "./dto/create-food-meal.input";
import { UpdateFoodMealInput } from "./dto/update-food-meal.input";
import { FoodMealObject } from "./object/food-meal.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => FoodMealObject)
export class FoodMealResolver {
  constructor(private readonly foodMealService: FoodMealService) {}

  @Mutation(() => FoodMealObject)
  createFoodMeal(
    @Args("createFoodMealInput") createFoodMealInput: CreateFoodMealInput,
  ) {
    return this.foodMealService.create(createFoodMealInput);
  }

  @Query(() => [FoodMealObject], { name: "foodMeals" })
  findAll() {
    return this.foodMealService.findAll();
  }

  @Query(() => FoodMealObject, { name: "foodMealById" })
  findOne(@Args("id") id: string) {
    return this.foodMealService.findOne(id);
  }

  @Mutation(() => FoodMealObject)
  updateFoodMeal(
    @Args("updateFoodMealInput") updateFoodMealInput: UpdateFoodMealInput,
  ) {
    return this.foodMealService.update(
      updateFoodMealInput.id,
      updateFoodMealInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeFoodMeal(@Args("id") id: string) {
    return this.foodMealService.remove(id);
  }
}
