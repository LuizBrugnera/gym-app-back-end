import { Module } from "@nestjs/common";
import { TrainerService } from "./trainer.service";
import { TrainerResolver } from "./trainer.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trainer } from "../../infra/entity/trainer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerResolver, TrainerService],
  exports: [TrainerService],
})
export class TrainerModule {}
