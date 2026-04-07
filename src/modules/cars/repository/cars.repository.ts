import type { CarDTO, createCarChema } from "../cars.schema.js";
import type { ICarRepository } from "./types.js";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { cars } from "../../../infra/database/schemas/cars.js";
import * as schema from "../../../infra/database/schemas/cars.js";

export class CarRepository implements ICarRepository {
  constructor(private database: NodePgDatabase<typeof schema>) {}

  async getAll(): Promise<CarDTO[] | null> {
    const response = await this.database.select().from(cars);

    return response;
  }

  async create(item: createCarChema): Promise<any> {
    await this.database.insert(cars).values(item);
  }
}
