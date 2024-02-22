import { Test, TestingModule } from "@nestjs/testing";
import { FoodMealService } from "./food-meal.service";

describe("FoodMealService", () => {
  let service: FoodMealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodMealService],
    }).compile();

    service = module.get<FoodMealService>(FoodMealService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
