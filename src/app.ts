import createApp from '@/lib/create-app';
import configureOpenAPI from '@/lib/open-api-config';
// Routes
import index from '@/routes/index.route';
import tasks from '@/routes/tasks/tasks.index';

const app = createApp();

configureOpenAPI(app);

const _app = app.route('/', index).route('/tasks', tasks);

export type AppType = typeof _app;

export default _app;
