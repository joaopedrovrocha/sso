import { Request, Response, Router } from "express";

import { validationSchemaMiddleware } from "../middlewares/validation-schema.middleware";
import { controller as CreatePlatformController, validationSchema as CreatePlatformValidationSchema } from './use-cases/create-platform';
import { controller as GetPlatformController, validationSchema as GetPlatformValidationSchema } from './use-cases/get-platform'

const routes = Router()

routes.get('/:platformUUID', validationSchemaMiddleware(GetPlatformValidationSchema), (req: Request, res: Response) => GetPlatformController.handle(req, res))
routes.post('/', validationSchemaMiddleware(CreatePlatformValidationSchema), (req: Request, res: Response) => CreatePlatformController.handle(req, res))

export default routes