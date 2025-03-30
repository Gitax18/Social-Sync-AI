import { Router } from 'express';
import ContentController from '../controllers/content.controller';
import PassportService from '../middlewares/passport.middlware';

const router: Router = Router();

// Get all content
router.get('/',PassportService.authenticate("user"), ContentController.getAll);

// Get one content by ID
router.get('/:id',PassportService.authenticate("user"), ContentController.get);

// Add new content
router.post('/',PassportService.authenticate("user"), ContentController.add);

// Update content by ID
router.put('/:id',PassportService.authenticate("user"), ContentController.update);

// Delete content by ID
router.delete('/:id',PassportService.authenticate("user"), ContentController.delete);

export default router;
