import { Request, Response } from 'express'
import { CheckMeService } from "./check-me.service";

export class CheckMeController {
  constructor(private service: CheckMeService) { }

  async handle(req: Request, res: Response) {
    try {
      const { username } = req.body

      const isUser = await this.service.call(username)

      return res
        .status(200)
        .json({ success: true, data: { isUser } })

    } catch (e) {
      return res
        .status(400)
        .json({ success: false, error: (e as Error).message })
    }
  }
}