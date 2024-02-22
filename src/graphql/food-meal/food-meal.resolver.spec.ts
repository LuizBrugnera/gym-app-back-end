import { Test, TestingModule } from "@nestjs/testing";
import { FoodMealResolver } from "./food-meal.resolver";
import { FoodMealService } from "./food-meal.service";

describe("FoodMealResolver", () => {
  let resolver: FoodMealResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodMealResolver, FoodMealService],
    }).compile();

    resolver = module.get<FoodMealResolver>(FoodMealResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
