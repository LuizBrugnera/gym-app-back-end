import { Test, TestingModule } from "@nestjs/testing";
import { StudentDataCheckResolver } from "./student-data-check.resolver";
import { StudentDataCheckService } from "./student-data-check.service";

describe("StudentDataCheckResolver", () => {
  let resolver: StudentDataCheckResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentDataCheckResolver, StudentDataCheckService],
    }).compile();

    resolver = module.get<StudentDataCheckResolver>(StudentDataCheckResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
