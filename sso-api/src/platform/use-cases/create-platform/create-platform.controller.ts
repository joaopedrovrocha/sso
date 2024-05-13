import { Request, Response } from 'express'
import { CreatePlatformService } from "./create-platform.service";
import { PlatformInput } from '../../../database/models/platform.model';

export class CreatePlatformController {
  constructor(private service: CreatePlatformService) { }

  async handle(req: Request, res: Response) {
    try {
      const data = (req.body as PlatformInput)

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