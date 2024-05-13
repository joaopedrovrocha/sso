import bcrypt from 'bcryptjs';
import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { UserRepository } from "../../../database/repository/user.repository";
import { jwtSign } from '../../../utils/jwt.utils';

export type AuthenticatePayload = {
  username: string
  password: string
  platformUUID: string
}

export class AuthenticateService {
  constructor(
    private userRepo: UserRepository,
    private platformUserRepo: PlatformUserRepository,
    private platformRepo: PlatformRepository
  ) { }

  async call(payload: AuthenticatePayload) {
    const userData = await this.userRepo.getByUsername(payload.username)

    const isValid = bcrypt.compareSync(payload.password, userData.password)

    if (!isValid) {
      throw new Error(`${AuthenticateService.name} invalid password for ${payload.username}`)
    }

    const platform = await this.platformRepo.getByUuid(payload.platformUUID)

    const platformUserExists = await this.platformUserRepo.getByExample({ userId: userData.id, platformId: platform.id })

    let platformUserData = platformUserExists.length > 0 ? platformUserExists[0] : null

    if (platformUserData) {
      // if platform user relation exists, we should revalidate the token
      platformUserData = await this.platformUserRepo.revalidateToken(platformUserData.id)

    } else {
      // if platform user relation does not exists, we should create
      platformUserData = await this.platformUserRepo.create({ userId: userData.id, platformId: platform.id })
    }

    const userId = platformUserData.userId
    const platformId = platformUserData.platformId

    const token = jwtSign(userId, platformId)

    return {
      token,
      userId,
      platformId,
      redirectUrl: platform.redirectUrl,
      uuid: platform.uuid
    }
  }
}