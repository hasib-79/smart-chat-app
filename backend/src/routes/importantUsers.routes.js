import express from 'express'
import { setImportantUsers, getImportantUsers } from "../controllers/importantUsers.controller.js"
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/:groupId', protectRoute, setImportantUsers);
router.get('/:groupId', protectRoute, getImportantUsers);

export default router;