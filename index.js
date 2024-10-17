import { createServer } from 'node:http'
import config from './src/config/config.js'
import { requestHandler } from './src/app.js'

export const app = createServer(requestHandler)
  .listen(config.PORT, () => console.log('server running at http://localhost:' + config.PORT))