import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  SESSION_SECRET,
  CORS_ALLOWED_ORIGINS,
  APP_DIRECT_AUTHORIZATION
} = process.env

export const appConfig = {
  ENV: NODE_ENV || 'production',
  PORT: parseInt(PORT || '3000'),
  SESSION_SECRET: SESSION_SECRET || 'SESSION_SECRET',
  JWT_SECRET: JWT_SECRET || 'JWT_SECRET',
  JWT_EXPIRES: '24h',
  CORS_ALLOWED_ORIGINS: CORS_ALLOWED_ORIGINS ? CORS_ALLOWED_ORIGINS?.split(',') : [],
  isTesting: (NODE_ENV || 'production') === 'test',
  DIRECT_AUTHORIZATION: process.env.APP_DIRECT_AUTHORIZATION || false
}