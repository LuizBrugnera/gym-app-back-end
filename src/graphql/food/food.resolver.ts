import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { FoodService } from "./food.service";
import { CreateFoodInput } from "./dto/create-food.input";
import { UpdateFoodInput } from "./dto/update-food.input";
import { FoodObject } from "./object/food.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => FoodObject)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => FoodObject)
  createFood(@Args("createFoodInput") createFoodInput: CreateFoodInput) {
    return this.foodService.create(createFoodInput);
  }

  @Query(() => [FoodObject], { name: "foods" })
  findAll() {
    return this.foodService.findAll();
  }

  @Query(() => FoodObject, { name: "foodById" })
  findOne(@Args("id") id: string) {
    return this.foodService.findOneById(id);
  }

  @Mutation(() => FoodObject)
  updateFood(@Args("updateFoodInput") updateFoodInput: UpdateFoodInput) {
    return this.foodService.update(updateFoodInput.id, updateFoodInput);
  }

  @Mutation(() => DeleteObject)
  removeFood(@Args("id") id: string) {
    return this.foodService.remove(id);
  }
}
