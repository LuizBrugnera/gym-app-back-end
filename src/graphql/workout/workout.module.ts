import { Module } from "@nestjs/common";
import { WorkoutService } from "./workout.service";
import { WorkoutResolver } from "./workout.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workout } from "../../infra/entity/workout.entity";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), StudentModule],
  providers: [WorkoutResolver, WorkoutService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
