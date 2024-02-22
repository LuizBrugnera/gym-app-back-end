import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { FeedbackResolver } from "./feedback.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "../../infra/entity/feedback.entity";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), StudentModule],
  providers: [FeedbackResolver, FeedbackService],
})
export class FeedbackModule {}
