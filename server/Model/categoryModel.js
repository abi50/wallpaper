// models/categoryModel.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    isDeleted: { type: Boolean, default: false }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
