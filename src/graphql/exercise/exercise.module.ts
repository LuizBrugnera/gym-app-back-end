import { Module } from "@nestjs/common";
import { ExerciseService } from "./exercise.service";
import { ExerciseResolver } from "./exercise.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercise } from "../../infra/entity/exercise.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExerciseResolver, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
