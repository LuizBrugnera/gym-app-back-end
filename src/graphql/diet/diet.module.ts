import { Module } from "@nestjs/common";
import { DietService } from "./diet.service";
import { DietResolver } from "./diet.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Diet } from "../../infra/entity/diet.entity";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [TypeOrmModule.forFeature([Diet]), StudentModule],
  providers: [DietResolver, DietService],
  exports: [DietService],
})
export class DietModule {}
