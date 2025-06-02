import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { timestamps } from '@/db/column.helpers';

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  done: boolean('done').notNull().default(false),
  ...timestamps,
});

export const selectTaskSchema = createSelectSchema(tasks);

export const insertTaskSchema = createInsertSchema(tasks, {
  name: (val) => val.min(1).max(500),
})
  .required({
    done: true,
  })
  .omit({
    createdAt: true,
    updatedAt: true,
  });

export const updateTaskSchema = insertTaskSchema.partial();
