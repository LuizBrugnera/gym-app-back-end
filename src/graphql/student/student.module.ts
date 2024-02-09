import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentResolver } from "./student.resolver";
import { Student } from "../../infra/entity/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainerModule } from "../trainer/trainer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Student]), TrainerModule],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
