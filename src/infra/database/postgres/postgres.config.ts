import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const postgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USER"),
    password: configService.get<string>("DB_PASS"),
    database: configService.get<string>("DB_NAME"),
    entities: [join(process.cwd(), "dist/**/*.entity.js")],
    autoLoadEntities: true,
    synchronize: true,
  };
};
