import { ValueTransformer } from "typeorm";

export class DateTransformer implements ValueTransformer {
  // Quando lendo do banco de dados
  from(value: string): Date {
    return new Date(value);
  }

  // Quando salvando no banco de dados
  to(value: Date): any {
    return value;
  }
}
