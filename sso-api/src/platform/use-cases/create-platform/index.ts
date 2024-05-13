import { PlatformRepository } from "../../../database/repository/platform.repository";
import { CreatePlatformController } from "./create-platform.controller";
import { CreatePlatformService } from "./create-platform.service";
import { validationSchema } from "./create-platform.validation-schema";

const repository = new PlatformRepository()
const service = new CreatePlatformService(repository)
const controller = new CreatePlatformController(service)

export { service, controller, validationSchema }