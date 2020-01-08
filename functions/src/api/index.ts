import * as functions from 'firebase-functions'
import * as express from 'express'
import routerV1 from './v1'

const app = express()

// API router v1 (/api/ is added on main index.ts export)
app.use('/api/v1', routerV1)

export const api = functions.runWith({}).https.onRequest(app)
