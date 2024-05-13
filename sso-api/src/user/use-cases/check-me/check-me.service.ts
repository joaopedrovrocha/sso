import { UserRepository } from "../../../database/repository/user.repository";

export class CheckMeService {
  constructor(private repository: UserRepository) { }

  async call(username: string) {
    try {
      await this.repository.getByUsername(username)

      return true

    } catch (e) {
      return false
    }
  }
}