import { Request, Response, Router } from "express";

import { controller as AuthCheckerController, validationSchema as AuthCheckerValidationSchema } from './use-cases/auth-checker';
import { controller as AuthenticateController, validationSchema as AuthenticateValidationSchema } from './use-cases/authenticate';
import { controller as AuthorizeController, validationSchema as AuthorizeValidationSchema } from './use-cases/authorize';
import { controller as CheckMeController, validationSchema as CheckMeValidationSchema } from './use-cases/check-me';
import { controller as LogoutController } from './use-cases/logout';
import { controller as MeController } from './use-cases/me';
import { controller as RegisterController, validationSchema as RegisterValidationSchema } from './use-cases/register';

import { authMiddleware } from "../middlewares/auth.middleware";
import { validationSchemaMiddleware } from "../middlewares/validation-schema.middleware";

const routes = Router()

// open routes
routes.post('/register', validationSchemaMiddleware(RegisterValidationSchema), (req: Request, res: Response) => RegisterController.handle(req, res))
routes.post('/authenticate', validationSchemaMiddleware(AuthenticateValidationSchema), (req: Request, res: Response) => AuthenticateController.handle(req, res))
routes.post('/authorize', validationSchemaMiddleware(AuthorizeValidationSchema), (req: Request, res: Response) => AuthorizeController.handle(req, res))
routes.post('/check-me', validationSchemaMiddleware(CheckMeValidationSchema), (req: Request, res: Response) => CheckMeController.handle(req, res))

// auth routes
routes.get('/me', authMiddleware, (req: Request, res: Response) => MeController.handle(req, res))
routes.get('/auth-checker', authMiddleware, validationSchemaMiddleware(AuthCheckerValidationSchema), (req: Request, res: Response) => AuthCheckerController.handle(req, res))
routes.post('/logout', authMiddleware, (req: Request, res: Response) => LogoutController.handle(req, res))

export default routes