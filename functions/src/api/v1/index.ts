import * as express from 'express'
import getEvents from './getEvents'
import getIcals from './getIcals'

// router
const router = express.Router()

// Events APIs
router.get('/events/', getEvents)
router.get('/icals/', getIcals)

export default router
