import { CustomerRepository } from "../../../database/repository/customer.repository"
import { PlatformUserRepository } from "../../../database/repository/platform-user.repository"
import { PlatformRepository } from "../../../database/repository/platform.repository"
import { UserRepository } from "../../../database/repository/user.repository"
import { RegisterController } from "./regiser.controller"
import { RegisterService } from "./register.service"
import { validationSchema } from './register.validation-schema'

const platformRepo = new PlatformRepository()
const userRepo = new UserRepository()
const customerRepo = new CustomerRepository()
const platformUserRepo = new PlatformUserRepository()

const service = new RegisterService(platformRepo, userRepo, customerRepo, platformUserRepo)
const controller = new RegisterController(service)

export { controller, service, validationSchema }