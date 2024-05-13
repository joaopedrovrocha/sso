import { Router } from 'express'

import userRoutes from './user/routes'
import platformRoutes from './platform/routes'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/platform', platformRoutes)

export default routes