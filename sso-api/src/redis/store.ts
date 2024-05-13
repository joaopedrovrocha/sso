import RedisStore from 'connect-redis'
import { redisInstance } from '.'

export const redisStore = new RedisStore({ client: redisInstance })