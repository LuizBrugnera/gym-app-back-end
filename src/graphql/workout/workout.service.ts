import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateWorkoutInput } from "./dto/create-workout.input";
import { UpdateWorkoutInput } from "./dto/update-workout.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Workout } from "../../infra/entity/workout.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    private readonly studentService: StudentService,
  ) {}

  async create(createWorkoutInput: CreateWorkoutInput) {
    const student = await this.studentService.findOneById(
      createWorkoutInput.studentId,
    );

    if (!student) {
      throw new NotFoundException("Student not found");
    }

    return await this.workoutRepository.save(
      this.workoutRepository.create(createWorkoutInput),
    );
  }

  async findAll() {
    return await this.workoutRepository.find({
      relations: ["student", "workoutExercises", "workoutExercises.exercise"],
    });
  }

  async findOneById(id: string) {
    const workout = await this.workoutRepository.findOne({
      where: { id },
      relations: ["student", "workoutExercises", "workoutExercises.exercise"],
    });
    if (!workout) throw new NotFoundException("Workout not found");
    return workout;
  }

  async update(id: string, updateWorkoutInput: UpdateWorkoutInput) {
    const workout = await this.workoutRepository.findOneBy({ id });
    if (!workout) throw new NotFoundException("Workout not found");

    if (updateWorkoutInput.studentId) {
      const student = await this.studentService.findOneById(
        updateWorkoutInput.studentId,
      );
      if (!student) throw new NotFoundException("Student not found");
    }

    const updated = await this.workoutRepository.update(id, updateWorkoutInput);

    if (updated.affected === 1) {
      return await this.workoutRepository.findOneBy({ id });
    }
    throw new InternalServerErrorException("Workout not updated");
  }

  async remove(id: string) {
    const workout = await this.workoutRepository.findOneBy({ id });
    if (!workout) throw new NotFoundException("Workout not found");

    await this.workoutRepository.remove(workout);

    return { id };
  }
}
