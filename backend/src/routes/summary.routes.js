import express from 'express'
import { summarizeMessages } from '../controllers/summary.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/:groupId', protectRoute, summarizeMessages);

export default router;