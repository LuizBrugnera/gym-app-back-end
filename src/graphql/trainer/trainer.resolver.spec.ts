import { Test, TestingModule } from "@nestjs/testing";
import { TrainerResolver } from "./trainer.resolver";
import { TrainerService } from "./trainer.service";
import { Trainer } from "../../infra/entity/trainer.entity";
import { CreateTrainerInput } from "./dto/create-trainer.input";
import { UpdateTrainerInput } from "./dto/update-trainer.input";

describe("TrainerResolver", () => {
  let resolver: TrainerResolver;
  let service: TrainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerResolver,
        {
          provide: TrainerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TrainerResolver>(TrainerResolver);
    service = module.get<TrainerService>(TrainerService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  it("should create a trainer", async () => {
    const input: CreateTrainerInput = {
      name: "John Doe",
      email: "john@example.com",
      password: "secret",
      birthdate: new Date("1990-01-01"),
    };
    const output: Trainer = {
      id: "1",
      ...input,
      passwordHash: "hashed",
      birthdate: input.birthdate,
      students: [],
    };

    jest.spyOn(service, "create").mockImplementation(async () => output);

    expect(await resolver.createTrainer(input)).toEqual(output);
  });

  it("should find all trainers", async () => {
    const output: Trainer[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        passwordHash: "hashed",
        birthdate: new Date("1990-01-01"),
        students: [],
      },
    ];

    jest.spyOn(service, "findAll").mockImplementation(async () => output);

    expect(await resolver.findAll()).toEqual(output);
  });

  it("should find one trainer by id", async () => {
    const id = "1";
    const output: Trainer = {
      id,
      name: "John Doe",
      email: "john@example.com",
      passwordHash: "hashed",
      birthdate: new Date("1990-01-01"),
      students: [],
    };

    jest.spyOn(service, "findOneById").mockImplementation(async () => output);

    expect(await resolver.findOneById(id)).toEqual(output);
  });

  it("should update a trainer", async () => {
    const input: UpdateTrainerInput = { id: "1", name: "Jane Doe" };
    const output: Trainer = {
      id: "1",
      name: "Lane Doe",
      ...input,
      email: "jane@example.com",
      passwordHash: "hashed",
      birthdate: new Date("1990-01-01"),
      students: [],
    };

    jest.spyOn(service, "update").mockImplementation(async () => output);

    expect(await resolver.updateTrainer(input)).toEqual(output);
  });

  it("should remove a trainer", async () => {
    const id = "1";
    const output: Trainer = {
      id,
      name: "John Doe",
      email: "john@example.com",
      passwordHash: "hashed",
      birthdate: new Date("1990-01-01"),
      students: [],
    };

    jest.spyOn(service, "remove").mockImplementation(async () => output);

    expect(await resolver.removeTrainer(id)).toEqual(output);
  });
});
