import { sign } from "jsonwebtoken"
import { appConfig } from "../config"

export interface JwtValue {
  userId: number
  platformId: number
}

export const jwtSign = (userId: number, platformId: number) => {
  return sign({ userId, platformId }, appConfig.JWT_SECRET, { expiresIn: appConfig.JWT_EXPIRES })
}