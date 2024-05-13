import IORedis from 'ioredis'
import { redisConfig } from './config'

export const redisInstance = new IORedis(redisConfig.URL, { password: redisConfig.PASSWORD })