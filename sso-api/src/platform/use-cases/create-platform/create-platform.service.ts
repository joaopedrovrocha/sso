import { PlatformInput } from "../../../database/models/platform.model";
import { PlatformRepository } from "../../../database/repository/platform.repository";

export class CreatePlatformService {
  constructor(private repository: PlatformRepository) { }

  async call(payload: PlatformInput) {
    return this.repository.create(payload)
  }
}