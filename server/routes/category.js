// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controler/category.js';

const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:code', categoryController.getCategoryByCode);
router.put('/categories/:code', categoryController.updateCategory);
router.delete('/categories/:code', categoryController.deleteCategory);

export default router;
