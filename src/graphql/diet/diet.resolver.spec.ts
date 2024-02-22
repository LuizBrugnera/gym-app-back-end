import { Test, TestingModule } from "@nestjs/testing";
import { DietResolver } from "./diet.resolver";
import { DietService } from "./diet.service";

describe("DietResolver", () => {
  let resolver: DietResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietResolver, DietService],
    }).compile();

    resolver = module.get<DietResolver>(DietResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
