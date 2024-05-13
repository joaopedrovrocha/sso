import { PlatformRepository } from "../../../database/repository/platform.repository";
import { validationSchema } from "./get-platform.validation-schema";
import { GetPlatformController } from "./get-platform.controller";
import { GetPlatformService } from "./get-platform.service";

const repository = new PlatformRepository()
const service = new GetPlatformService(repository)
const controller = new GetPlatformController(service)

export { service, controller, validationSchema }