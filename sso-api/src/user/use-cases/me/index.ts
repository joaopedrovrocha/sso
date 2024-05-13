import { CustomerRepository } from "../../../database/repository/customer.repository";
import { UserRepository } from "../../../database/repository/user.repository";
import { MeController } from "./me.controller";
import { MeService } from "./me.service";

const userRepo = new UserRepository()
const customerRepo = new CustomerRepository()

const service = new MeService(userRepo, customerRepo)
const controller = new MeController(service)

export { service, controller }