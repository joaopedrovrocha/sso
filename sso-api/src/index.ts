import { appConfig } from './config'

import app from './app'

app.listen(appConfig.PORT, () => {
  console.log(`App running on port ${appConfig.PORT}`)
})