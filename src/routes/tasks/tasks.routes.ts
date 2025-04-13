import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas';

import { insertTaskSchema, selectTaskSchema, updateTaskSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';

const tags: string[] = ['Tasks'];

// List route definition
export const list = createRoute({
  tags,
  summary: 'List all tasks',
  path: '/',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTaskSchema), 'The list of tasks'),
  },
});

// Create route definition
export const create = createRoute({
  tags,
  summary: 'Create a new task',
  path: '/',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTaskSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(selectTaskSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTaskSchema), 'The validation error(s)'),
  },
});

// Get single task route definition
export const getOne = createRoute({
  tags,
  summary: 'Get a single task',
  method: 'get',
  path: '/{id}',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'Requested task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), 'Invalid ID format'),
  },
});

// Patch route definition
export const patch = createRoute({
  tags,
  summary: 'Update a task',
  path: '/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateTaskSchema, 'The task updates'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'The updated task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(updateTaskSchema).or(createErrorSchema(IdParamsSchema)), 'The validation error(s)'),
  },
});

// Remove task route definition
export const remove = createRoute({
  tags,
  summary: 'Remove a task',
  path: '/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Task deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), 'Invalid ID format'),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
