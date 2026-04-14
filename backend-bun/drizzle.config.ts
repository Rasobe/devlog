import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '../.env' })

const db = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || '5432',
  name: process.env.POSTGRES_DB!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
}

const DATABASE_URL = `postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
})