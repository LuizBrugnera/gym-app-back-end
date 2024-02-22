import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { StudentObject } from "./object/student.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => StudentObject)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentObject)
  createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentObject], { name: "students" })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => StudentObject, { name: "studentById" })
  findOneById(@Args("id") id: string) {
    return this.studentService.findOneById(id);
  }

  @Mutation(() => StudentObject)
  updateStudent(
    @Args("updateStudentInput") updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeStudent(@Args("id") id: string) {
    return this.studentService.remove(id);
  }
}
