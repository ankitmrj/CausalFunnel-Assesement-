import { Router } from 'express';
import { createEvent, getHeatmap, getSessionEvents, getSessions } from '../controllers/eventController.js';

const router = Router();

router.post('/events', createEvent);
router.get('/sessions', getSessions);
router.get('/sessions/:sessionId/events', getSessionEvents);
router.get('/heatmap', getHeatmap);

export default router;
