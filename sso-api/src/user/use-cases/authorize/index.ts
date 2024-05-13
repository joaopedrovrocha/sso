import { PlatformUserRepository } from "../../../database/repository/platform-user.repository";
import { PlatformRepository } from "../../../database/repository/platform.repository";
import { AuthorizeController } from "./authorize.controller";
import { AuthorizeService } from "./authorize.service";
import { validationSchema } from "./authorize.validation-schema";

const platformUserRepo = new PlatformUserRepository()
const platformRepo = new PlatformRepository()
const service = new AuthorizeService(platformUserRepo, platformRepo)
const controller = new AuthorizeController(service)

export { controller, service, validationSchema };
