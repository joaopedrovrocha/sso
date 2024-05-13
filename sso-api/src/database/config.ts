import dotenv from 'dotenv'

dotenv.config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_SCHEMA,
  DB_FORCE_RESET,
} = process.env

export const dbConfig = {
  USER: DB_USER || 'user',
  PASSWORD: DB_PASSWORD || 'pass',
  HOST: DB_HOST || 'host',
  PORT: parseInt(DB_PORT || '0'),
  DATABASE: DB_NAME || 'name',
  SCHEMA: DB_SCHEMA || 'schema',
  FORCE: JSON.parse(DB_FORCE_RESET || 'false')
}