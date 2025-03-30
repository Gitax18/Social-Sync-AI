import { Router, Request, Response } from 'express';
import ChatGenerator from '../controllers/ai.controller';
import PassportService from '../middlewares/passport.middlware';

const router = Router();


// Route for generating based on mediaType
router.post('/generate/:mediaType',PassportService.authenticate("user"), ChatGenerator.generate);

export default router;
