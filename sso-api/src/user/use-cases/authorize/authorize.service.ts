import moment from "moment";
import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { jwtSign } from "../../../utils/jwt.utils";

export type AuthorizeServicePayload = {
  validationToken: string
}

export class AuthorizeService {
  constructor(
    private platformUserRepo: PlatformUserRepository,
    private platformRepo: PlatformRepository
  ) { }

  async call(payload: AuthorizeServicePayload) {
    const platformUserData = await this.platformUserRepo.getByExample(payload)

    if (platformUserData.length === 0) {
      throw new Error(`${AuthorizeService.name} not found | TOKEN ${payload.validationToken}`)
    }

    const expiresAt = platformUserData[0].tokenExpiresAt
    const now = moment(new Date())

    const isExpired = now.diff(moment(expiresAt)) > 0

    if (isExpired) {
      throw new Error(`${AuthorizeService.name} token expired`)
    }

    const userId = platformUserData[0].userId
    const platformId = platformUserData[0].platformId

    const token = jwtSign(userId, platformId)

    const platform = await this.platformRepo.getById(platformId)

    return {
      token,
      userId,
      platformId,
      redirectUrl: platform.redirectUrl,
      uuid: platform.uuid
    }
  }
}