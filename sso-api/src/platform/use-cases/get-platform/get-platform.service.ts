import { PlatformRepository } from "../../../database/repository/platform.repository";

export class GetPlatformService {
  constructor(private repository: PlatformRepository) { }

  async call(platformUUID: string) {
    return this.repository.getByUuid(platformUUID)
  }
}