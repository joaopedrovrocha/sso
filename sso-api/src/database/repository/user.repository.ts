import bcrypt from 'bcryptjs';
import User, { UserInput, UserOutput } from "../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<UserInput, UserOutput> {
  constructor() {
    super(User)
  }

  async create(payload: UserInput & Omit<any, string>): Promise<UserOutput> {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(payload.password, salt)

    return super.create({ ...payload, password: hash })
  }

  async getByUsername(username: string): Promise<UserOutput> {
    const users = await this.getByExample({ username })

    if (users.length == 0) {
      throw new Error(`${this.model.name} not found with username ${username}`)
    }

    return users[0]
  }
}