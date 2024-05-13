import { Request, Response } from 'express'
import { RegisterPayload, RegisterService } from "./register.service";

export class RegisterController {
  constructor(private service: RegisterService) { }

  async handle(req: Request, res: Response) {
    try {
      const data = (req.body as RegisterPayload)

      const response = await this.service.call(data)

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