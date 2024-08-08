// services/categoryService.js
import Category from '../Model/categoryModel.js';
import { getNextCategoryId } from '../utils/idGenerator.js'; // ייבוא הפונקציה

export const createCategory = async (name) => {
    const code = await getNextCategoryId(); // קבלת הקוד הבא
    const category = new Category({ name, code });
    return await category.save();
};

export const getAllCategories = async () => {
    return await Category.find({ isDeleted: false });
};

export const getCategoryByCode = async (code) => {
    return await Category.findOne({ code, isDeleted: false });
};

export const updateCategory = async (code, name) => {
    return await Category.findOneAndUpdate(
        { code, isDeleted: false },
        { name },
        { new: true }
    );
};

export const deleteCategory = async (code) => {
    return await Category.findOneAndUpdate(
        { code, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
};
