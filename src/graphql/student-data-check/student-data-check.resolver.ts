import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StudentDataCheckService } from "./student-data-check.service";
import { CreateStudentDataCheckInput } from "./dto/create-student-data-check.input";
import { UpdateStudentDataCheckInput } from "./dto/update-student-data-check.input";
import { StudentDataCheckObject } from "./object/student-data-check.object";
import { DeleteObject } from "../../common/objects/delete.object";

@Resolver(() => StudentDataCheckObject)
export class StudentDataCheckResolver {
  constructor(
    private readonly studentDataCheckService: StudentDataCheckService,
  ) {}

  @Mutation(() => StudentDataCheckObject)
  createStudentDataCheck(
    @Args("createStudentDataCheckInput")
    createStudentDataCheckInput: CreateStudentDataCheckInput,
  ) {
    return this.studentDataCheckService.create(createStudentDataCheckInput);
  }

  @Query(() => [StudentDataCheckObject], { name: "studentDataChecks" })
  findAll() {
    return this.studentDataCheckService.findAll();
  }

  @Query(() => StudentDataCheckObject, { name: "studentDataCheckById" })
  findOne(@Args("id", { type: () => Int }) id: string) {
    return this.studentDataCheckService.findOneById(id);
  }

  @Mutation(() => StudentDataCheckObject)
  updateStudentDataCheck(
    @Args("updateStudentDataCheckInput")
    updateStudentDataCheckInput: UpdateStudentDataCheckInput,
  ) {
    return this.studentDataCheckService.update(
      updateStudentDataCheckInput.id,
      updateStudentDataCheckInput,
    );
  }

  @Mutation(() => DeleteObject)
  removeStudentDataCheck(@Args("id", { type: () => Int }) id: string) {
    return this.studentDataCheckService.remove(id);
  }
}
