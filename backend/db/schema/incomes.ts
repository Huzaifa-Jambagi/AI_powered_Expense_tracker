import {
  pgTable,
  uuid,
  numeric,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { incomeCategories } from "./income-categories";

export const incomes = pgTable("incomes", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  categoryId: uuid("category_id")
    .notNull()
    .references(() => incomeCategories.id, {
      onDelete: "restrict",
    }),

  amount: numeric("amount", {
    precision: 15,
    scale: 2,
  }).notNull(),

  note: text("note"),

  incomeDate: timestamp("income_date", {
    withTimezone: true,
  }).notNull(),

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