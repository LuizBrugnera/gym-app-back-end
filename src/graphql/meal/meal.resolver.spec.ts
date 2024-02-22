import { Test, TestingModule } from "@nestjs/testing";
import { MealResolver } from "./meal.resolver";
import { MealService } from "./meal.service";

describe("MealResolver", () => {
  let resolver: MealResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealResolver, MealService],
    }).compile();

    resolver = module.get<MealResolver>(MealResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
