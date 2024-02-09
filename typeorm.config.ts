import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Diet } from "./src/infra/entity/diet.entity";
import { Exercise } from "./src/infra/entity/exercise.entity";
import { Feedback } from "./src/infra/entity/feedback.entity";
import { Food } from "./src/infra/entity/food.entity";
import { FoodMeal } from "./src/infra/entity/food_meal.entity";
import { Meal } from "./src/infra/entity/meal.entity";
import { StudentDataCheck } from "./src/infra/entity/student-data-check.entity";
import { Student } from "./src/infra/entity/student.entity";
import { Trainer } from "./src/infra/entity/trainer.entity";
import { WorkoutExercise } from "./src/infra/entity/workout-exercise.entity";
import { Workout } from "./src/infra/entity/workout.entity";
import { DataSource } from "typeorm";
config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  username: configService.getOrThrow<string>("DB_USER"),
  password: configService.getOrThrow<string>("DB_PASS"),
  database: configService.getOrThrow<string>("DB_NAME"),
  entities: [
    Trainer,
    Student,
    StudentDataCheck,
    Exercise,
    Workout,
    WorkoutExercise,
    Diet,
    Meal,
    Food,
    FoodMeal,
    Feedback,
  ],
  migrations: ["./src/infra/database/postgres/migrations/**"],
});
