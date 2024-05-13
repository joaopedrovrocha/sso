import { CustomerRepository } from "../../../database/repository/customer.repository";
import { UserRepository } from "../../../database/repository/user.repository";

export class MeService {
  constructor(
    private userRepo: UserRepository,
    private customerRepo: CustomerRepository
  ) { }

  async call(userId: number) {
    const userData = await this.userRepo.getById(userId)
    const customerData = await this.customerRepo.getByUserId(userId)

    const { password, ...userDataResponse } = userData

    return {
      user: userDataResponse,
      customer: customerData
    }
  }
}