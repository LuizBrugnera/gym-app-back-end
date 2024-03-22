import { Module } from "@nestjs/common";
import { SecurityService } from "./security.service";
import { SecurityResolver } from "./security.resolver";
import { JwtModule } from "@nestjs/jwt";
import { TrainerModule } from "../trainer/trainer.module";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [
    JwtModule.register({
      secret: "your-secret-key", //.env
      signOptions: { expiresIn: "30d" },
    }),
    TrainerModule,
    StudentModule,
  ],
  providers: [SecurityResolver, SecurityService],
})
export class SecurityModule {}
