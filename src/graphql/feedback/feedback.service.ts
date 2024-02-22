import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFeedbackInput } from "./dto/create-feedback.input";
import { UpdateFeedbackInput } from "./dto/update-feedback.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Feedback } from "../../infra/entity/feedback.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedBackRepository: Repository<Feedback>,
    private readonly studentService: StudentService,
  ) {}

  async create(createFeedbackInput: CreateFeedbackInput) {
    const student = await this.studentService.findOneById(
      createFeedbackInput.studentId,
    );
    if (!student) throw new NotFoundException("Student not found");

    return await this.feedBackRepository.save(
      this.feedBackRepository.create(createFeedbackInput),
    );
  }

  async findAll() {
    return await this.feedBackRepository.find();
  }

  async findOneById(id: string) {
    const feedback = await this.feedBackRepository.findOneBy({ id });
    if (!feedback) throw new NotFoundException("Feedback not found");
    return feedback;
  }

  async update(id: string, updateFeedbackInput: UpdateFeedbackInput) {
    const feedback = await this.feedBackRepository.findOneBy({ id });
    if (!feedback) throw new NotFoundException("Feedback not found");

    if (updateFeedbackInput.studentId) {
      const student = await this.studentService.findOneById(
        updateFeedbackInput.studentId,
      );
      if (!student) throw new NotFoundException("Student not found");
    }

    const updated = await this.feedBackRepository.update(
      id,
      updateFeedbackInput,
    );

    if (updated.affected === 1) {
      return this.feedBackRepository.findOneBy({ id });
    }
  }

  async remove(id: string) {
    const feedback = await this.feedBackRepository.findOneBy({ id });
    if (!feedback) throw new NotFoundException("Feedback not found");

    this.feedBackRepository.remove(feedback);

    return { id };
  }
}
