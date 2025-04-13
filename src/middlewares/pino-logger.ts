import { Context, MiddlewareHandler } from 'hono';
import { Env, pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export const generateRequestId = function (): string {
  return `${crypto.randomUUID()}`;
};

export const logger = function () {
  return ((c, next) =>
    pinoLogger({
      pino: pino(
        {
          level: c.env.LOG_LEVEL || 'info',
        },
        c.env.NODE_ENV === 'production' ? undefined : pretty()
      ),
      http: {
        referRequestIdKey: generateRequestId(),
      },
    })(c as unknown as Context<Env>, next)) satisfies MiddlewareHandler<AppBindings>;
};
