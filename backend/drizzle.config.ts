import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.LOCAL_DATABASE_URL!,
  },
});
