import { v4 } from "uuid";
import PlatformUser, { PlatformUserInput, PlatformUserOutput } from "../models/platform-user.model";
import { BaseRepository } from "./base.repository";
import moment from "moment";

export class PlatformUserRepository extends BaseRepository<PlatformUserInput, PlatformUserOutput> {
  constructor() {
    super(PlatformUser)
  }

  async create(payload: PlatformUserInput & Omit<any, string>): Promise<PlatformUserOutput> {
    const token = v4().replace(/-/g, '').slice(0, 10).toUpperCase()
    const expiresAt = moment().add(1, 'hour').toISOString()

    return super.create({
      ...payload,
      validationToken: token,
      tokenExpiresAt: new Date(expiresAt)
    })
  }

  async revalidateToken(id: number): Promise<PlatformUserOutput> {
    const token = v4().replace(/-/g, '').slice(0, 10).toUpperCase()
    const expiresAt = moment().add(1, 'hour').toISOString()

    return super.update(id, {
      validationToken: token,
      tokenExpiresAt: new Date(expiresAt)
    })
  }
}