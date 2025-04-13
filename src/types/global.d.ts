import type { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

import { Environment } from '@/env';

declare global {
  // This is the global type declaration file for the Hono framework
  interface AppBindings {
    Bindings: Environment;
    Variables: {
      logger: PinoLogger;
    };
  }

  type AppOpenAPI = OpenAPIHono<AppBindings>;
}
