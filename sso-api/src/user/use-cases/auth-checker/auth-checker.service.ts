import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { jwtSign } from "../../../utils/jwt.utils";

export class AuthCheckerService {
  constructor(
    private platformRepo: PlatformRepository,
    private platformUserRepo: PlatformUserRepository
  ) { }

  async call(userId: number, platformUUID: string) {
    const platformData = await this.platformRepo.getByUuid(platformUUID)

    const platformUserExists = await this.platformUserRepo.getByExample({ userId, platformId: platformData.id })

    let platformUserData = platformUserExists.length > 0 ? platformUserExists[0] : null

    if (!platformUserData) {
      platformUserData = await this.platformUserRepo.create({ userId, platformId: platformData.id })
    }

    const token = jwtSign(userId, platformData.id)

    return {
      token
    }
  }
}