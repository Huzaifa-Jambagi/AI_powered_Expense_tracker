import { db } from "../db/db";
import { users } from "../db/schema/index";
import { eq } from "drizzle-orm";

export const create = async (id: string, clerk_id: string, name: string, email: string) => {
    return db.insert(users).values({ id, clerk_id, name, email,onboarding_completed:false });
};

export const update = async (clerk_id: string, name: string, email: string) => {
    return db.update(users).set({ name, email }).where(eq(users.clerk_id, clerk_id));
};

export const remove = async (clerk_id: string) => {
    return db.delete(users).where(eq(users.clerk_id, clerk_id));
};