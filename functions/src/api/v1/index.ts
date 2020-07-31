import * as express from 'express'
import * as cors from 'cors'
import getEvents from './getAPIEvents'
import getIcals from './getIcals'

const router = express.Router()

router.use(cors({ origin: true }))

// Events APIs
router.get('/events/', getEvents)
router.get('/icals/', getIcals)

export default router
