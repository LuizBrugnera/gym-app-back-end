import { Test, TestingModule } from "@nestjs/testing";
import { StudentDataCheckService } from "./student-data-check.service";

describe("StudentDataCheckService", () => {
  let service: StudentDataCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentDataCheckService],
    }).compile();

    service = module.get<StudentDataCheckService>(StudentDataCheckService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
