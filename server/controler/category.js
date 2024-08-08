// controllers/categoryController.js
import * as categoryService from '../services/category.js';
import Category from '../Model/categoryModel.js';
export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });
        
        if (existingCategory) {
            throw new Error("Category already exists");
        }

        const newCategory = await categoryService.createCategory(name);
        res.status(201).json(newCategory);
    } catch (error) {
        // שלח את הודעת השגיאה לצד הלקוח
        res.status(400).json({ error: error.message });
    }
};




export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoryByCode = async (req, res) => {
    try {
        const category = await categoryService.getCategoryByCode(req.params.code);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await categoryService.updateCategory(req.params.code, name);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.params.code);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category marked as deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
