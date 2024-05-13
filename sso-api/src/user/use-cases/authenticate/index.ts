import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { UserRepository } from "../../../database/repository/user.repository";
import { AuthenticateController } from "./authenticate.controller";
import { AuthenticateService } from "./authenticate.service";
import { validationSchema } from "./authenticate.validation-schema";

const userRepo = new UserRepository()
const platformUserRepo = new PlatformUserRepository()
const platformRepo = new PlatformRepository()

const service = new AuthenticateService(userRepo, platformUserRepo, platformRepo)
const controller = new AuthenticateController(service)

export { service, controller, validationSchema }