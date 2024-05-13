import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { appConfig } from '../config'
import { JwtValue } from '../utils/jwt.utils'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let isUserLoggedIn = req.session.userId !== undefined

  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ')

    const isValid = jwt.verify(token, appConfig.JWT_SECRET)

    if (isValid) {
      const jwtData = jwt.decode(token) as JwtValue

      req.session.userId = jwtData.userId
      isUserLoggedIn = true
    }
  }

  if (!isUserLoggedIn) {
    return res
      .status(401)
      .json({ success: false, error: `user is not logged in` })
  }

  return next()
}