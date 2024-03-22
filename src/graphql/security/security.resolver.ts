import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { SecurityService } from "./security.service";
import { LoginStudentInput } from "./dto/login-student.input";
import { LoginTrainerInput } from "./dto/login-trainer.input";
import { UnauthorizedException } from "@nestjs/common";

@Resolver()
export class SecurityResolver {
  constructor(private readonly securityService: SecurityService) {}

  @Mutation(() => String)
  async LoginStudent(
    @Args("LoginStudentInput") loginStudentInput: LoginStudentInput,
  ) {
    const student = await this.securityService.validateStudent(
      loginStudentInput.email,
      loginStudentInput.password,
    );

    if (!student) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.securityService.loginStudent(student);
  }

  @Mutation(() => String)
  async LoginTrainer(
    @Args("LoginTrainerInput") loginTrainerInput: LoginTrainerInput,
  ) {
    const trainer = await this.securityService.validateTrainer(
      loginTrainerInput.email,
      loginTrainerInput.password,
    );

    if (!trainer) {
      throw new UnauthorizedException("Invalid email or password");
    }
    return this.securityService.loginTrainer(trainer);
  }
}
