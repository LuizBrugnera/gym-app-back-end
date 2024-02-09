import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { PostgresModule } from "./infra/database/postgres/postgres.module";
import { TrainerModule } from "./graphql/trainer/trainer.module";
import { StudentModule } from "./graphql/student/student.module";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
