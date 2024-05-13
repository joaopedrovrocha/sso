import { appConfig } from "../config"
import { dbConfig } from "./config"
import { seed } from './seed'

import { Customer, Platform, PlatformUser, User } from "./models"

const isDev = appConfig.ENV === 'development'

const dbInit = async () => {
  await Platform.sync({ alter: isDev, force: isDev && dbConfig.FORCE })
  await User.sync({ alter: isDev, force: isDev && dbConfig.FORCE })
  await Customer.sync({ alter: isDev, force: isDev && dbConfig.FORCE })
  await PlatformUser.sync({ alter: isDev, force: isDev && dbConfig.FORCE })

  await seed()
}

export default dbInit