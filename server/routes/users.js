// routes/users.js
import express from 'express';
import { createUser, getUserById, updateUserById, deleteUserById } from '../controler/users.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
