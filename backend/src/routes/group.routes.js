import express from 'express'
import { createGroup, getUserGroups } from '../controllers/group.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.get("/", protectRoute, getUserGroups);

export default router;