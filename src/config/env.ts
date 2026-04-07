import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(333),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  OPENAI_API_KEY: z.string(),
  MODEL_NAME: z.string(),
});

const _env = envSchema.safeParse(process.env);

if(_env.error){
  throw new Error('Missing env variables')
}

export const env = _env.data;
