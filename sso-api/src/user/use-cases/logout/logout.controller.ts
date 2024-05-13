import { Request, Response } from 'express'

export class LogoutController {
  constructor() { }

  async handle(req: Request, res: Response) {
    try {
      req.session.destroy(() => { })

      return res
        .status(200)
        .json({ success: true, data: { isAuth: !!req.session } })

    } catch (e) {
      return res
        .status(400)
        .json({ success: false, error: (e as Error).message })
    }
  }
}