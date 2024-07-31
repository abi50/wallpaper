import * as imageController from '../controler/users.js';
import {Router} from 'express'
const router = Router();

router.post('/', imageController.createImage);
router.get('/:id', imageController.getImageById);
router.put('/:id', imageController.updateImageById);
router.delete('/:id', imageController.deleteImageById);

export default router;