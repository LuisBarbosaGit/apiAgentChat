import type { CarDTO, createCarDTO, SearchCarFilters } from "../cars.schema.js";
import type { ICarRepository } from "./schema.js";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { cars } from "../../../infra/database/schemas/cars.js";
import * as schema from "../../../infra/database/schemas/cars.js";
import { searchQueryBuilder } from "../search/search-query-builder.js";
import { desc } from "drizzle-orm";

export class CarRepository implements ICarRepository {
  constructor(private database: NodePgDatabase<typeof schema>) {}

  async getAll(): Promise<CarDTO[] | null> {
    const response = await this.database.select().from(cars);

    return response;
  }

  async create(item: createCarDTO): Promise<CarDTO[]> {
    const response = await this.database.insert(cars).values(item).returning();

    return response;
  }

  async filterCars(filters: SearchCarFilters): Promise<CarDTO[]> {
    const queryFiltersParams = searchQueryBuilder(filters);
    let itemsfiltered = this.database.select().from(cars).$dynamic();

    if (queryFiltersParams.where) {
      itemsfiltered = itemsfiltered.where(queryFiltersParams.where);
    }

    const items = await itemsfiltered.orderBy(desc(cars.createdAt));

    return [...items];
  }
}
