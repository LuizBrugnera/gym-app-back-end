import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { PostgresModule } from "./infra/database/postgres/postgres.module";
import { TrainerModule } from "./graphql/trainer/trainer.module";
import { StudentModule } from "./graphql/student/student.module";
import { StudentDataCheckModule } from "./graphql/student-data-check/student-data-check.module";
import { ExerciseModule } from "./graphql/exercise/exercise.module";
import { FeedbackModule } from "./graphql/feedback/feedback.module";
import { WorkoutModule } from "./graphql/workout/workout.module";
import { WorkoutExerciseModule } from "./graphql/workout-exercise/workout-exercise.module";
import { FoodModule } from "./graphql/food/food.module";
import { DietModule } from "./graphql/diet/diet.module";
import { MealModule } from "./graphql/meal/meal.module";
import { FoodMealModule } from "./graphql/food-meal/food-meal.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TrainerModule,
    StudentModule,
    StudentDataCheckModule,
    ExerciseModule,
    WorkoutModule,
    WorkoutExerciseModule,
    FeedbackModule,
    FoodModule,
    DietModule,
    MealModule,
    FoodMealModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
