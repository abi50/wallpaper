import express from 'express';
import {
    createUser,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
    getUserCollectionsController,
    getUserImagesController,
    addImageToCollectionController
} from '../controler/users.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', updateUserByIdController);
router.delete('/users/:id', deleteUserByIdController);
router.get('/users/:id/collections', getUserCollectionsController);
router.get('/users/:id/images', getUserImagesController);
router.post('/users/add-image-to-collection', addImageToCollectionController);

export default router;
