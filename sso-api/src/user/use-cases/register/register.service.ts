import sequelizeConnection from "../../../database";
import { CustomerInput } from "../../../database/models/customer.model";
import { UserInput } from "../../../database/models/user.model";
import { CustomerRepository } from "../../../database/repository/customer.repository";
import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { UserRepository } from "../../../database/repository/user.repository";

export type RegisterPayload =
  Pick<UserInput, 'username' | 'password'> &
  Pick<CustomerInput, 'name' | 'email' | 'phoneNumber'> &
  { platformUUID: string }

export class RegisterService {
  constructor(
    private platformRepo: PlatformRepository,
    private userRepo: UserRepository,
    private customerRepo: CustomerRepository,
    private platformUserRepo: PlatformUserRepository
  ) { }

  async call(payload: RegisterPayload) {
    const t = await sequelizeConnection.transaction()

    try {
      this.platformRepo.setTranscation(t)
      this.userRepo.setTranscation(t)
      this.customerRepo.setTranscation(t)
      this.platformUserRepo.setTranscation(t)

      const platform = await this.platformRepo.getByUuid(payload.platformUUID)

      // create user
      const userCreated = await this.userRepo.create(payload)

      // create customer
      await this.customerRepo.create({ userId: userCreated.id, ...payload })

      // create platform user relation
      const platformUserCreated = await this.platformUserRepo.create({ userId: userCreated.id, platformId: platform.id })

      await t.commit()

      return platformUserCreated

    } catch (e) {
      await t.rollback()

      throw e
    }
  }
}