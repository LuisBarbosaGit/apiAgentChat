import z from "zod";

export type CarDTO = {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  price: string;
  fuel: string | null;
  transmission: string | null;
  mileage: number | null;
  imageUrl: string | null;
};

export const createCarSchema = z.object({
  brand: z.string(),
  model: z.string(),
  version: z.string(),
  year: z.number(),
  price: z.string(),
  fuel: z.string(),
  transmission: z.string(),
  mileage: z.number(),
  imageUrl: z.string(),
});

export const searchCarSchema = z.object({
  search: z.string().min(1),
});

export const searchFiltersSchema = z.object({
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  version: z.string().trim().optional(),
  year: z.number().optional(),
  mileage: z.number().optional(),
});

export type createCarDTO = z.infer<typeof createCarSchema>;
export type SearchCarRequest = z.infer<typeof searchCarSchema>;
export type SearchCarFilters = z.infer<typeof searchFiltersSchema>;
