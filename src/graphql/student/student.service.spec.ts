import { Test, TestingModule } from "@nestjs/testing";
import { StudentService } from "./student.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Student } from "../../infra/entity/student.entity";
import { Repository } from "typeorm";
import { TrainerService } from "../trainer/trainer.service";
import { CreateStudentInput } from "./dto/create-student.input";
import { NotFoundException } from "@nestjs/common";
import { UpdateStudentInput } from "./dto/update-student.input";
import { SexType } from "../../common/enums/sex-type.enum";

const mockStudentRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockTrainerService = {
  findOneById: jest.fn(),
};

describe("StudentService", () => {
  let service: StudentService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let studentRepository: Repository<Student>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let trainerService: TrainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository,
        },
        {
          provide: TrainerService,
          useValue: mockTrainerService,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    trainerService = module.get<TrainerService>(TrainerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should successfully create a student", async () => {
      const createStudentInput: CreateStudentInput = {
        trainerId: "1",
        name: "Test Student",
        email: "test@example.com",
        password: "password",
        birthdate: new Date(),
        sex: SexType.MALE,
      };

      const trainer = { id: "1", name: "Test Trainer" };
      mockTrainerService.findOneById.mockResolvedValue(trainer);
      mockStudentRepository.create.mockImplementation((student) => student);
      mockStudentRepository.save.mockResolvedValue({
        id: "1",
        trainer: trainer,
        name: createStudentInput.name,
        email: createStudentInput.email,
        birthdate: createStudentInput.birthdate,
        sex: createStudentInput.sex,
        password_hash: expect.any(String),
      });

      const result = await service.create(createStudentInput);

      expect(result).toEqual({
        id: "1",
        trainer: trainer,
        name: createStudentInput.name,
        email: createStudentInput.email,
        birthdate: createStudentInput.birthdate,
        sex: createStudentInput.sex,
        password_hash: expect.any(String),
      });
      expect(mockTrainerService.findOneById).toHaveBeenCalledWith(
        createStudentInput.trainerId,
      );
      expect(mockStudentRepository.create).toHaveBeenCalledWith({
        trainer: trainer,
        name: createStudentInput.name,
        email: createStudentInput.email,
        birthdate: createStudentInput.birthdate,
        sex: createStudentInput.sex,
        password_hash: expect.any(String),
      });
      expect(mockStudentRepository.save).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return an array of students", async () => {
      const students = [
        { id: "1", name: "Student One" },
        { id: "2", name: "Student Two" },
      ];
      mockStudentRepository.find.mockResolvedValue(students);

      const result = await service.findAll();
      expect(result).toEqual(students);
      expect(mockStudentRepository.find).toHaveBeenCalledWith({
        relations: ["trainer"],
      });
    });
  });

  describe("findOneById", () => {
    it("should return a single student", async () => {
      const student = { id: "1", name: "Student One" };
      mockStudentRepository.findOne.mockResolvedValue(student);

      const result = await service.findOneById("1");
      expect(result).toEqual(student);
      expect(mockStudentRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
        relations: ["trainer"],
      });
    });

    it("should throw NotFoundException if student is not found", async () => {
      mockStudentRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOneById("non-existing")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    it("should update a student and return the updated student", async () => {
      const updateStudentInput: UpdateStudentInput = {
        id: "1",
        name: "Updated Name",
      };
      const updatedStudent = { id: "1", name: "Updated Name" };
      mockStudentRepository.findOneBy.mockResolvedValue(updatedStudent);
      mockStudentRepository.update.mockResolvedValue({ affected: 1 });
      mockStudentRepository.findOneBy.mockResolvedValue(updatedStudent);

      const result = await service.update("1", updateStudentInput);
      expect(result).toEqual(updatedStudent);
      expect(mockStudentRepository.update).toHaveBeenCalledWith(
        "1",
        updateStudentInput,
      );
      expect(mockStudentRepository.findOneBy).toHaveBeenCalledWith({ id: "1" });
    });

    it("should throw NotFoundException if student does not exist", async () => {
      mockStudentRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.update("non-existing", undefined)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should remove a student", async () => {
      const student = { id: "1" };
      mockStudentRepository.findOneBy.mockResolvedValue(student);
      mockStudentRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove("1");
      expect(result).toEqual(student);
      expect(mockStudentRepository.delete).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundException if student does not exist", async () => {
      mockStudentRepository.findOneBy.mockResolvedValue(undefined);

      await expect(service.remove("non-existing")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
