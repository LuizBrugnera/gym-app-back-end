import { Test, TestingModule } from "@nestjs/testing";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { Student } from "../../infra/entity/student.entity";
import { SexType } from "../../common/enums/sex-type.enum";

describe("StudentResolver", () => {
  let resolver: StudentResolver;
  let service: StudentService;

  beforeEach(async () => {
    const mockStudentService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOneById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    resolver = module.get<StudentResolver>(StudentResolver);
    service = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  it("should create a student", async () => {
    const input: CreateStudentInput = {
      trainerId: "trainer-id",
      name: "Test Student",
      email: "test@example.com",
      password: "password",
      birthdate: new Date(),
      sex: SexType.MALE,
    };
    const output: Student = {
      id: "student-id",
      birthdate: input.birthdate,
      email: input.email,
      name: input.name,
      sex: input.sex,
      trainerId: input.trainerId,
      passwordHash: expect.any(String),
      diets: [],
      feedbacks: [],
      studentDataChecks: [],
      trainer: {
        id: "trainer-id",
        birthdate: new Date(),
        email: "trainer@gmail.com",
        name: "John Doe",
        passwordHash: "passwordhash",
        students: [],
      },
      workouts: [],
    };
    jest.spyOn(service, "create").mockImplementation(async () => output);

    expect(await resolver.createStudent(input)).toEqual(output);
  });

  it("should find all students", async () => {
    const output: Student[] = [
      {
        id: "student-id",
        birthdate: new Date(),
        trainerId: "trainer-id",
        name: "Test Student",
        email: "test@example.com",
        sex: SexType.MALE,
        passwordHash: "passwordhash",
        diets: [],
        feedbacks: [],
        studentDataChecks: [],
        trainer: {
          id: "trainer-id",
          birthdate: new Date(),
          email: "trainer@gmail.com",
          name: "John Doe",
          passwordHash: "passwordhash",
          students: [],
        },
        workouts: [],
      },
    ];

    jest.spyOn(service, "findAll").mockImplementation(async () => output);
    expect(await resolver.findAll()).toEqual(output);
  });

  it("should find one student by id", async () => {
    const id = "some-student-id";
    const output: Student = {
      id: "student-id",
      birthdate: new Date(),
      trainerId: "trainer-id",
      name: "Test Student",
      email: "test@example.com",
      sex: SexType.MALE,
      passwordHash: "passwordhash",
      diets: [],
      feedbacks: [],
      studentDataChecks: [],
      trainer: {
        id: "trainer-id",
        birthdate: new Date(),
        email: "trainer@gmail.com",
        name: "John Doe",
        passwordHash: "passwordhash",
        students: [],
      },
      workouts: [],
    };
    jest.spyOn(service, "findOneById").mockImplementation(async () => output);

    expect(await resolver.findOneById(id)).toEqual(output);
  });

  it("should update a student", async () => {
    const input: UpdateStudentInput = {
      id: "student-id",
      name: "Updated Name",
    };
    const output: Student = {
      id: "student-id",
      birthdate: input.birthdate,
      email: input.email,
      name: input.name,
      sex: input.sex,
      trainerId: input.trainerId,
      passwordHash: expect.any(String),
      diets: [],
      feedbacks: [],
      studentDataChecks: [],
      trainer: {
        id: "trainer-id",
        birthdate: new Date(),
        email: "trainer@gmail.com",
        name: "John Doe",
        passwordHash: "passwordhash",
        students: [],
      },
      workouts: [],
    };
    jest.spyOn(service, "update").mockImplementation(async () => output);

    expect(await resolver.updateStudent(input)).toEqual(output);
  });

  it("should remove a student", async () => {
    const id = "student-id";
    const output: Student = {
      id: "student-id",
      birthdate: new Date(),
      trainerId: "trainer-id",
      name: "Test Student",
      email: "test@example.com",
      sex: SexType.MALE,
      passwordHash: "passwordhash",
      diets: [],
      feedbacks: [],
      studentDataChecks: [],
      trainer: {
        id: "trainer-id",
        birthdate: new Date(),
        email: "trainer@gmail.com",
        name: "John Doe",
        passwordHash: "passwordhash",
        students: [],
      },
      workouts: [],
    };
    jest.spyOn(service, "remove").mockImplementation(async () => output);

    expect(await resolver.removeStudent(id)).toEqual(output);
  });
});
