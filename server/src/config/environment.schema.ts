import * as z from "zod";

export const environmentSchema = z.object({
  PORT: z.coerce.number<number>(),
  CORS_ORIGIN: z.string(),
});
