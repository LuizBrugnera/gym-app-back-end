import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutExerciseResolver } from "./workout-exercise.resolver";
import { WorkoutExerciseService } from "./workout-exercise.service";

describe("WorkoutExerciseResolver", () => {
  let resolver: WorkoutExerciseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutExerciseResolver, WorkoutExerciseService],
    }).compile();

    resolver = module.get<WorkoutExerciseResolver>(WorkoutExerciseResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
