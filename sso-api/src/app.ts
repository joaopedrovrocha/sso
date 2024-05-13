import cors from 'cors'
import express, { Express } from "express"
import session from 'express-session'
import { v4 } from 'uuid'
import { appConfig } from './config'
import dbInit from "./database/init"
import { seed } from "./database/seed"
import { redisStore } from './redis/store'
import routes from './routes'

dbInit()

const app: Express = express()

app.use(cors({
  origin: appConfig.CORS_ALLOWED_ORIGINS,
  methods: ['POST', 'GET'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  genid: () => v4(),
  secret: appConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: redisStore,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use('/api/v1', routes)

export default app