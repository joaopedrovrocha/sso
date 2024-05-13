import { Request, Response } from 'express';
import { MeService } from "./me.service";

export class MeController {
  constructor(private service: MeService) { }

  async handle(req: Request, res: Response) {
    try {
      const userId = req.session.userId

      if (!userId) {
        throw new Error('session not started')
      }

      const response = await this.service.call(userId)

      return res
        .status(200)
        .json({ success: true, data: response })

    } catch (e) {
      return res
        .status(400)
        .json({ success: false, error: (e as Error).message })
    }

  }
}