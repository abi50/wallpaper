// routes/users.js
import express from 'express';
import {
    getUserById,
    getUserByName, // ייבוא הפונקציה
    createUser,
    updateUserById,
    deleteUserById,
    deleteUserByIdController,
     getUserCollectionsController 
} 
    from '../controler/users.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/:name', getUserByName);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.delete('/:id', deleteUserByIdController);
router.get('/:id/collections', getUserCollectionsController);



export default router;
