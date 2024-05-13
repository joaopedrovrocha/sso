import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export const validationSchemaMiddleware = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
      session: req.session
    })

    return next()
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, error: (e as Error).message })
  }
}