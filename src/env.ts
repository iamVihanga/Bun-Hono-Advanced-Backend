import type { ZodError } from 'zod';

import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    DATABASE_URL: z.string().url(),
  });

export type EnvSchema = z.infer<typeof envSchema>;

let env: EnvSchema;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error('❌ Invalid Env.');
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;