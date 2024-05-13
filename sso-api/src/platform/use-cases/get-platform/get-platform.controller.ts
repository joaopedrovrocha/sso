import { Request, Response } from 'express'
import { GetPlatformService } from './get-platform.service';

export class GetPlatformController {
  constructor(private service: GetPlatformService) { }

  async handle(req: Request, res: Response) {
    try {
      const platformUUID = req.params.platformUUID as string

      const response = await this.service.call(platformUUID)

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