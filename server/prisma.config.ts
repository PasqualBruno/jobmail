import "dotenv/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // O '!' garante ao TS que a string existe e não é undefined
    url: process.env.DATABASE_URL!,
  },
});
