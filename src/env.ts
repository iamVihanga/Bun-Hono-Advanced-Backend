import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: 'DATABASE_AUTH_TOKEN is required in production',
      });
    }
  });

export type Environment = z.infer<typeof envSchema>;

export function parseEnv(data: any) {
  const { data: env, error } = envSchema.safeParse(data);

  if (error) {
    const errorMessage = `❌ Invalid Env: ${Object.entries(error.flatten().fieldErrors)
      .map(([key, errors]) => `${key}: ${errors?.join(',')}`)
      .join(' | ')}`;

    throw new Error(errorMessage);
  }

  return env;
}
