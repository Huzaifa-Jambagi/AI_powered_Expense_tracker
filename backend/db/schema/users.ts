import { pgTable, varchar, index,uuid } from "drizzle-orm/pg-core";
import * as p from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),

    clerk_id: varchar("clerk_id", { length: 64 }).notNull().unique(),

    name: varchar("name", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    onboarding_completed: p.boolean("onboarding_completed").notNull().default(false),
}, (table) => [
    index("users_clerk_id_idx").on(table.clerk_id)
]);