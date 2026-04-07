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

export type createCarChema = z.infer<typeof createCarSchema>;
