import { config } from 'dotenv'

config({ path: '../.env' })

const db = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || '5432',
  name: process.env.POSTGRES_DB!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
}

export const env = {
  DATABASE_URL: `postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRATION_MS: Number(process.env.JWT_EXPIRATION_MS) || 86400000,
  PORT: Number(process.env.PORT) || 3001,
}