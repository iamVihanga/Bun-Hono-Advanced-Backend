import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { logger } from '@/middlewares/pino-logger';

export const createRouter = function (): OpenAPIHono<AppBindings> {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
};

export default function createApp(): OpenAPIHono<AppBindings> {
  const app = createRouter();

  // Middleware
  app.use(serveEmojiFavicon('🚀'));
  app.use(logger());

  // Error Handelling Middleware
  app.onError(onError);

  // Not Found Handelling Middleware
  app.notFound(notFound);

  return app;
}
