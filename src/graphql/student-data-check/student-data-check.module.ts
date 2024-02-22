import { Module } from "@nestjs/common";
import { StudentDataCheckService } from "./student-data-check.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentDataCheck } from "../../infra/entity/student-data-check.entity";
import { StudentDataCheckResolver } from "./student-data-check.resolver";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [TypeOrmModule.forFeature([StudentDataCheck]), StudentModule],
  providers: [StudentDataCheckService, StudentDataCheckResolver],
  exports: [StudentDataCheckService],
})
export class StudentDataCheckModule {}
