import { and, ilike, eq, gte, lte, type SQL } from "drizzle-orm";
import type { SearchCarFilters } from "../cars.schema.js";
import { cars } from "../../../infra/database/schemas/cars.js";

export const searchQueryBuilder = (filters: SearchCarFilters) => {
  const parts: SQL[] = [];

  if (filters.brand) {
    parts.push(ilike(cars.brand, `%${filters.brand}%`));
  }

  if (filters.model) {
    parts.push(ilike(cars.model, `%${filters.model}%`));
  }

  if (filters.version) {
    parts.push(ilike(cars.version, `%${filters.version}%`));
  }

  if (filters.year) {
    parts.push(eq(cars.year, filters.year));
  }

  if (filters.mileage) {
    parts.push(eq(cars.mileage, filters.mileage));
  }

  if (!parts.length) {
    return {};
  }

  return { where: parts.length === 1 ? parts[0]! : and(...parts) };
};
