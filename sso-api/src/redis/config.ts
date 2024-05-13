const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT
} = process.env

export const redisConfig = {
  URL: `redis://${REDIS_HOST}:${REDIS_PORT}` || 'redis://127.0.0.1:6379',
  PASSWORD: REDIS_PASSWORD
}