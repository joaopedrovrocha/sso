import { Request, Response } from 'express';
import { AuthorizeServicePayload, AuthorizeService } from "./authorize.service";

export class AuthorizeController {
  constructor(private service: AuthorizeService) { }

  async handle(req: Request, res: Response) {
    try {
      const payload = (req.body as AuthorizeServicePayload)

      const response = await this.service.call(payload)

      req.session.userId = response.userId

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