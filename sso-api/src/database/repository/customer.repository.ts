import Customer, { CustomerInput, CustomerOutput } from "../models/customer.model";
import { BaseRepository } from "./base.repository";

export class CustomerRepository extends BaseRepository<CustomerInput, CustomerOutput> {
  constructor() {
    super(Customer)
  }

  async getByUserId(userId: number): Promise<CustomerOutput> {
    const data = await this.getByExample({ userId })

    if (data.length === 0) {
      throw new Error(`${this.model.name} not found by user id ${userId}`)
    }

    return data[0]
  }
}