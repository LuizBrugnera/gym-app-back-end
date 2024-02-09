import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const postgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    host: configService.getOrThrow<string>("DB_HOST"),
    port: configService.getOrThrow<number>("DB_PORT"),
    username: configService.getOrThrow<string>("DB_USER"),
    password: configService.getOrThrow<string>("DB_PASS"),
    database: configService.getOrThrow<string>("DB_NAME"),
    entities: [join(process.cwd(), "dist/**/*.entity.js")],
  };
};
