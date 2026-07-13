import express from 'express'
import { sendMessage, getMessages } from '../controllers/message.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/:groupId', protectRoute, sendMessage);
router.get('/:groupId', protectRoute, getMessages);

export default router;