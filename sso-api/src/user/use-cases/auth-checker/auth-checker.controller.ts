import { Request, Response } from 'express'
import { AuthCheckerService } from "./auth-checker.service";

export class AuthCheckerController {
  constructor(private service: AuthCheckerService) { }

  async handle(req: Request, res: Response) {
    try {
      let { platformUUID } = req.query
      const { userId } = req.session

      if (!userId) {
        throw new Error('session not started')
      }

      platformUUID = Array.isArray(platformUUID) ? platformUUID[0] : platformUUID

      const response = await this.service.call(userId, (platformUUID as string))

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