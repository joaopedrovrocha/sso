import { UserRepository } from "../../../database/repository/user.repository";
import { CheckMeController } from "./check-me.controller";
import { CheckMeService } from "./check-me.service";

import { validationSchema } from "./check-me.validation-schema";

const repository = new UserRepository()
const service = new CheckMeService(repository)
const controller = new CheckMeController(service)

export { service, controller, validationSchema }