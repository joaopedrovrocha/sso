import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { AuthCheckerController } from "./auth-checker.controller";
import { AuthCheckerService } from "./auth-checker.service";
import { validationSchema } from "./auth-checker.validation-schema";

const platformRepo = new PlatformRepository()
const platformUserRepo = new PlatformUserRepository()
const service = new AuthCheckerService(platformRepo, platformUserRepo)
const controller = new AuthCheckerController(service)

export { service, controller, validationSchema }