import {
  pgTable,
  uuid,
  numeric,
  text,
  timestamp,
  date,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { expenseCategories } from "./expense-categories";

export const expenses = pgTable("expenses", {
  id: varchar("id", { length: 16 }).primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => expenseCategories.id, {
      onDelete: "restrict",
    }),

  amount: numeric("amount", {
    precision: 15,
    scale: 2,
  }).notNull(),

  note: text("note"),

  expenseDate: date("expense_date").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
  }),
});