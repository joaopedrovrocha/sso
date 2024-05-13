import Platform, { PlatformInput, PlatformOutput } from "../models/platform.model";
import { BaseRepository } from "./base.repository";

export class PlatformRepository extends BaseRepository<PlatformInput, PlatformOutput> {
  constructor() {
    super(Platform)
  }

  async getByUuid(uuid: string): Promise<PlatformOutput> {
    const platforms = await this.getByExample({ uuid })

    if (platforms.length == 0) {
      throw new Error(`${this.model.name} not found with uuid ${uuid}`)
    }

    return platforms[0]
  }
}