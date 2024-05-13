import * as bcrypt from 'bcryptjs';
import { Platform } from "./models";
import Customer, { CustomerInput } from "./models/customer.model";
import { PlatformInput } from "./models/platform.model";
import User, { UserInput } from "./models/user.model";

const salt = bcrypt.genSaltSync(10)
const password = bcrypt.hashSync('password', salt)

const platform1: PlatformInput = {
  name: 'Burger King',
  logo: 'https://gkpb.com.br/wp-content/uploads/2021/01/novo-logo-burger-king.jpg',
  redirectUrl: 'http://localhost:8002/callback',
  url: 'http://localhost:8002',
  uuid: '3fc8e1ec-153b-437f-861d-ad2669c12a1e',
}

const platform2: PlatformInput = {
  name: 'Mc Donalds',
  logo: 'https://logosmarcas.net/wp-content/uploads/2020/04/McDonalds-Logo.png',
  redirectUrl: 'http://localhost:8003/callback',
  url: 'http://localhost:8003',
  uuid: '1284c2ec-5c47-44bf-9d6b-8dbc6fbb3dd5',
}

let user: UserInput = {
  username: 'username@mail.com',
  password,
}

const customer: CustomerInput = {
  name: 'Customer',
  email: 'username@mail.com',
  phoneNumber: '+5534999999999',
  userId: 1
}

export async function seed() {
  console.log('[DATABASE] seeding...')

  const p1Found = await Platform.findOne({ where: { name: platform1.name } })
  const p2Found = await Platform.findOne({ where: { name: platform2.name } })

  if (!p1Found) {
    console.log('creating platform ', platform1.name)
    Platform.create(platform1)
  }

  if (!p2Found) {
    console.log('creating platform ', platform2.name)
    Platform.create(platform2)
  }

  const userFound = await User.findOne({ where: { username: user.username } })

  if (!userFound) {
    user = await User.create(user)

    if (user.id) {
      await Customer.create({ ...customer, userId: user.id })
    }
  }
}