import { Test, TestingModule } from "@nestjs/testing";
import { TrainerService } from "./trainer.service";
import { Trainer } from "../../infra/entity/trainer.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrainerInput } from "./dto/create-trainer.input";
import { UpdateTrainerInput } from "./dto/update-trainer.input";

describe("TrainerService", () => {
  let service: TrainerService;
  let mockTrainerRepository: Partial<
    Record<keyof Repository<Trainer>, jest.Mock>
  >;

  beforeEach(async () => {
    mockTrainerRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerService,
        {
          provide: getRepositoryToken(Trainer),
          useValue: mockTrainerRepository,
        },
      ],
    }).compile();

    service = module.get<TrainerService>(TrainerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new trainer successfully", async () => {
      const createTrainerInput: CreateTrainerInput = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        birthdate: new Date("1990-01-01"),
      };

      const expectedCreateArgument = {
        name: createTrainerInput.name,
        email: createTrainerInput.email,
        passwordHash: expect.any(String),
        birthdate: createTrainerInput.birthdate,
      };

      mockTrainerRepository.create.mockImplementation(
        (trainerData) => trainerData,
      );
      mockTrainerRepository.save.mockResolvedValue({
        id: "1",
        ...expectedCreateArgument,
        students: [],
      });

      const result = await service.create(createTrainerInput);

      expect(result).toEqual(expect.objectContaining(expectedCreateArgument));
      expect(mockTrainerRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(expectedCreateArgument),
      );
      expect(mockTrainerRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(expectedCreateArgument),
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of trainers", async () => {
      const trainers: Trainer[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          passwordHash: "hashedpassword",
          birthdate: new Date("1990-01-01"),
          students: [],
        },
        {
          id: "2",
          name: "Jane Doe",
          email: "jane@example.com",
          passwordHash: "hashedpassword",
          birthdate: new Date("1991-02-02"),
          students: [],
        },
      ];

      mockTrainerRepository.find.mockResolvedValue(trainers);

      const result = await service.findAll();

      expect(result).toEqual(trainers);
      expect(mockTrainerRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOneById", () => {
    it("should return a trainer by id", async () => {
      const trainer: Trainer = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        passwordHash: "hashedpassword",
        birthdate: new Date("1990-01-01"),
        students: [],
      };

      mockTrainerRepository.findOneBy.mockResolvedValue(trainer);

      const result = await service.findOneById("1");

      expect(result).toEqual(trainer);
      expect(mockTrainerRepository.findOneBy).toHaveBeenCalledWith({ id: "1" });
    });

    it("should throw an error if trainer not found", async () => {
      mockTrainerRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.findOneById("nonexistent")).rejects.toThrow(
        "Trainer not found",
      );
    });
  });

  describe("update", () => {
    it("should update a trainer successfully", async () => {
      const updateTrainerInput: UpdateTrainerInput = {
        id: "1",
        name: "Jane Doe",
      };

      const updatedTrainer: Trainer = {
        id: "1",
        name: "Jane Doe",
        email: "john@example.com",
        passwordHash: "hashedpassword",
        birthdate: new Date("1990-01-01"),
        students: [],
      };

      mockTrainerRepository.findOneBy.mockResolvedValue(updatedTrainer);
      mockTrainerRepository.update.mockResolvedValue({ affected: 1 });
      mockTrainerRepository.findOneBy.mockResolvedValue(updatedTrainer);

      const result = await service.update("1", updateTrainerInput);

      expect(result).toEqual(updatedTrainer);
      expect(mockTrainerRepository.update).toHaveBeenCalledWith(
        "1",
        updateTrainerInput,
      );
    });
  });

  describe("remove", () => {
    it("should remove the trainer successfully", async () => {
      const trainer: Trainer = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        passwordHash: "hashedpassword",
        birthdate: new Date("1990-01-01"),
        students: [],
      };

      mockTrainerRepository.findOneBy.mockResolvedValue(trainer);
      mockTrainerRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove("1");

      expect(result).toEqual(trainer);
      expect(mockTrainerRepository.delete).toHaveBeenCalledWith("1");
    });

    it("should throw an error if trainer not found for deletion", async () => {
      mockTrainerRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.remove("nonexistent")).rejects.toThrow(
        "Trainer not found",
      );
    });
  });
});
