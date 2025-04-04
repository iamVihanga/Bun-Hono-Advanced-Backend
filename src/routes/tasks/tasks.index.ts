import { createRouter } from "@/lib/create-app";

import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;

// https://youtu.be/sNh9PoM9sUE?list=PLTxa3yJw3ixt9b8oT3Yy-uZYtiGIhcIsA&t=3779
