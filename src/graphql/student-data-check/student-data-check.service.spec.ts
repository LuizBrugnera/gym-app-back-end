import { Test, TestingModule } from "@nestjs/testing";
import { StudentDataCheckService } from "./student-data-check.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { StudentDataCheck } from "../../infra/entity/student-data-check.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";
import { CreateStudentDataCheckInput } from "./dto/create-student-data-check.input";
import { NotFoundException } from "@nestjs/common";
import { UpdateStudentDataCheckInput } from "./dto/update-student-data-check.input";
import { SexType } from "../../common/enums/sex-type.enum";
import { StudentDataCheckObject } from "./object/student-data-check.object";

const mockStudentDataCheckRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

const mockStudentService = () => ({
  findOneById: jest.fn(),
});

describe("StudentDataCheckService", () => {
  let service: StudentDataCheckService;
  let studentDataCheckRepository;
  let studentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentDataCheckService,
        {
          provide: getRepositoryToken(StudentDataCheck),
          useFactory: mockStudentDataCheckRepository,
        },
        {
          provide: StudentService,
          useFactory: mockStudentService,
        },
      ],
    }).compile();

    service = module.get<StudentDataCheckService>(StudentDataCheckService);
    studentDataCheckRepository = module.get<Repository<StudentDataCheck>>(
      getRepositoryToken(StudentDataCheck),
    );
    studentService = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should successfully create a student data check", async () => {
      const createInput: CreateStudentDataCheckInput = {
        studentId: "1",
        age: 20,
        height: 180,
        weight: 70,
        bf: 10,
        date: new Date(),
        sex: SexType.MALE,
        abdominal: 10,
        chest: 10,
        axillary: 10,
        bodyDensity: 10,
        subscapular: 10,
        suprailiac: 10,
        thigh: 10,
        tricep: 10,
      };
      const student = { id: "1", name: "Test Student" };
      const expectedDataCheck = {
        id: "1",
        ...createInput,
      };

      studentService.findOneById.mockResolvedValue(student);
      studentDataCheckRepository.create.mockReturnValue(expectedDataCheck);
      studentDataCheckRepository.save.mockResolvedValue(expectedDataCheck);

      const result = await service.create(createInput);

      expect(result).toEqual(expectedDataCheck);
      expect(studentService.findOneById).toHaveBeenCalledWith(
        createInput.studentId,
      );
      expect(studentDataCheckRepository.create).toHaveBeenCalledWith(
        createInput,
      );
      expect(studentDataCheckRepository.save).toHaveBeenCalledWith(
        expectedDataCheck,
      );
    });

    it("should throw NotFoundException if student is not found", async () => {
      const createInput: CreateStudentDataCheckInput = {
        studentId: "non-existing",
        age: 20,
        height: 180,
        weight: 70,
        bf: 10,
        date: new Date(),
        sex: SexType.MALE,
        abdominal: 10,
        chest: 10,
        axillary: 10,
        bodyDensity: 10,
        subscapular: 10,
        suprailiac: 10,
        thigh: 10,
        tricep: 10,
      };

      studentService.findOneById.mockResolvedValue(null);

      await expect(service.create(createInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of student data checks", async () => {
      const studentDataChecks: StudentDataCheckObject[] = [
        {
          id: "1",
          abdominal: 10,
          age: 20,
          axillary: 10,
          bf: 10,
          bodyDensity: 10,
          chest: 10,
          date: new Date(),
          height: 2,
          sex: SexType.MALE,
          subscapular: 10,
          suprailiac: 10,
          thigh: 10,
          tricep: 10,
          weight: 10,
          student: {
            id: "1",
            name: "Test Student",
            birthdate: new Date(),
            email: "email",
            sex: SexType.MALE,
            trainer: {
              id: "1",
              name: "Test Trainer",
              email: "email",
              birthdate: new Date(),
              students: [],
            },
            diets: [],
            feedbacks: [],
            studentDataChecks: [],
            workouts: [],
          },
        },
        {
          id: "2",
          abdominal: 15,
          age: 25,
          axillary: 33,
          bf: 4,
          bodyDensity: 16,
          chest: 30,
          date: new Date(),
          height: 2,
          sex: SexType.MALE,
          subscapular: 6,
          suprailiac: 5,
          thigh: 7,
          tricep: 8,
          weight: 9,
          student: {
            id: "1",
            name: "Test Student",
            birthdate: new Date(),
            email: "email",
            sex: SexType.MALE,
            trainer: {
              id: "1",
              name: "Test Trainer",
              email: "email",
              birthdate: new Date(),
              students: [],
            },
            diets: [],
            feedbacks: [],
            studentDataChecks: [],
            workouts: [],
          },
        },
      ];

      studentDataCheckRepository.find.mockResolvedValue(studentDataChecks);

      const result = await service.findAll();

      expect(result).toEqual(studentDataChecks);
      expect(studentDataCheckRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOneById", () => {
    it("should return a student data check by id", async () => {
      const id = "1";
      const studentDataCheck = {
        id: "1",
        student: { id: "1", name: "Test Student" },
      };

      studentDataCheckRepository.findOne.mockResolvedValue(studentDataCheck);

      const result = await service.findOneById(id);

      expect(result).toEqual(studentDataCheck);
      expect(studentDataCheckRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ["student"],
      });
    });

    it("should throw NotFoundException if no student data check is found", async () => {
      studentDataCheckRepository.findOne.mockResolvedValue(null);

      await expect(service.findOneById("non-existing")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    it("should update a student data check", async () => {
      const id = "1";

      const updateInput: UpdateStudentDataCheckInput = {
        id,
        studentId: "12",
        sex: SexType.FEMALE,
        age: 25,
        chest: 30,
      };
      const updatedStudentDataCheck = {
        id,
        student: { id: "1", name: "Test Student" },
        ...updateInput,
      };

      studentDataCheckRepository.findOneBy.mockResolvedValue(
        updatedStudentDataCheck,
      );
      studentDataCheckRepository.update.mockResolvedValue({ affected: 1 });
      studentDataCheckRepository.findOneBy.mockResolvedValue(
        updatedStudentDataCheck,
      );

      const result = await service.update(id, updateInput);

      expect(result).toEqual(updatedStudentDataCheck);
      expect(studentDataCheckRepository.update).toHaveBeenCalledWith(
        id,
        updateInput,
      );
      expect(studentDataCheckRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it("should throw NotFoundException if student data check does not exist", async () => {
      const updateInput: UpdateStudentDataCheckInput = {
        id: "1",
        studentId: "1",
        sex: SexType.FEMALE,
        bf: 10,
        chest: 10,
      };

      studentDataCheckRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update("non-existing", updateInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("remove", () => {
    it("should remove a student data check", async () => {
      const id = "1";
      const studentDataCheck = {
        id: "1",
        student: { id: "1", name: "Test Student" },
      };

      studentDataCheckRepository.findOneBy.mockResolvedValue(studentDataCheck);
      studentDataCheckRepository.remove.mockResolvedValue(studentDataCheck);

      const result = await service.remove(id);

      expect(result).toEqual({ id });
      expect(studentDataCheckRepository.remove).toHaveBeenCalledWith(
        studentDataCheck,
      );
    });

    it("should throw NotFoundException if student data check does not exist", async () => {
      studentDataCheckRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove("non-existing")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
