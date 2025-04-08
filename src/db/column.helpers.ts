import { sql } from 'drizzle-orm';
import { integer } from 'drizzle-orm/sqlite-core';

const defaultNow = sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`;

export const timestamps = {
  createdAt: integer('created_at', { mode: 'timestamp' }).default(defaultNow).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(defaultNow)
    .$onUpdate(() => new Date()),
};
