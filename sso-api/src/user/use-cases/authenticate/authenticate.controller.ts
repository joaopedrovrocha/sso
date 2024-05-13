import { Request, Response } from 'express'
import { AuthenticatePayload, AuthenticateService } from "./authenticate.service";
import { appConfig } from '../../../config';

export class AuthenticateController {
  constructor(private service: AuthenticateService) { }

  async handle(req: Request, res: Response) {
    try {
      const data = (req.body as AuthenticatePayload)

      const response = await this.service.call(data)

      if (appConfig.DIRECT_AUTHORIZATION) {
        req.session.userId = response.userId
      }

      return res
        .status(200)
        .json({ success: true, data: response })

    } catch (e) {
      let status = 500

      if ((e as Error).message.match(/invalid password for/)) {
        status = 401
      }

      return res
        .status(status)
        .json({ success: false, error: (e as Error).message })
    }
  }
}